import Employee from "./employee.model";
import Applicant from "../applicant/applicant.model";
import EmployeeLogin from "../employeeLogin/employeeLogin.model";
import { Op } from "sequelize";
import Position from "../position/position.model";

export async function findAllEmployeeInRestaurant (id: number) {
  try {
    const employee = await Employee.findAll({
      where: {
        restaurantId: id
      },
      include: [
        {
        model: Position
      },
      {
        model: Applicant
      }
    ],
    });

    return employee;
  } catch (error) {
    throw new Error('Error finding employee in restaurant.');
  }
}


export async function addEmployeeToRestaurant (restaurantId: number,data: { 
    // restaurantId: number,  
    name: string,
    email: string,
    experience?: [string],
    phoneNumber: number,
    address: string,
    skillTags?: [string],
    hourlyRate: number,
    efficiency?: string,
    imageUrl?: string
 }) {
  try {
    const newEmployee = await Employee.create({...data, restaurantId});
    return newEmployee;
  } catch (error) {
    console.log(error);
    throw new Error('Error adding employee to restaurant.');
  }
}

export async function addEmployeesToRestaurant(restaurantId: number, data: { 
    // restaurantId: number,  
    name: string,
    email: string,
    experience?: [string],
    phoneNumber?: number,
    address: string,
    skillTags?: [string],
    hourlyRate: number,
    efficiency?: string,
    imageUrl?: string
 }) {
  try {
    const newEmployee = await Employee.create({...data, restaurantId});
    return newEmployee;
  } catch (error) {
    console.log(error);
    throw new Error('Error adding employees to restaurant.');
  }
}


export async function addApplicantToEmployee (applicantId: number, restaurantId: number, data: { 
  name: string, 
  email: string,
  experience: [string],
  phoneNumber: number,
  address: string,
  skillTags: [string],
  hourlyRate: number,
  imageUrl?: string
}) {
try {
  let applicant = await Applicant.findOne({
    where: {
      id: applicantId
    }
  })
  if (!applicant) {
    throw new Error('Applicant not found.');
  }
  const newEmployee = await Employee.create({ ...data, restaurantId, applicantId });
  return newEmployee;
} catch (error) {
  console.log(error)
  throw new Error('Error adding applicant to employee.');
}
}

export async function findEmployeeById(EmployeeId: number) {
  try {
      const employee = await Employee.findByPk(EmployeeId);
      return employee;
  } catch (error) {
      console.log(error);
      throw new Error('Error while finding employee by ID in database');
  }
}

export async function updateEmployeeInformation(employeeId: number, data: {
    restaurantId?: number,  
    name?: string,
    email?: string,
    experience?: [string],
    phoneNumber?: number,
    address?: string,
    skillTags?: [string],
    hourlyRate?: number,
    positionId?: number,
    imageUrl?: string
}) {
  try {
    let existingEmployee = await Employee.findOne({
      where: {
        id: employeeId
      }
    })
    if (!existingEmployee) {
      throw new Error('Employee not found.');
    }
      const updatedSchedule = await existingEmployee.update(data);
      return updatedSchedule;
  } catch (error) {
      throw new Error('Error updating information for employee.');
  }
}

export async function deleteEmployeeById(employeeId: number) {
  try {
    const result  = await Employee.destroy({
      where: {
        id: employeeId
      }
    })
    if(result === 1) {
      return { success: true, message: 'Employee deleted successfully.'}
    } else {
      return { success: false, message: 'Employee not found'};
    }
  } catch (error) {
    console.log(error);
    throw new Error('Error While deleteing employee by ID in database.')
  }

}

export async function updateEmployeeById(emlpoyeeId: number, updatedData: {
    name?: string,
    email?: string,
    experience?: [string],
    phoneNumber?: number,
    address?: string,
    skillTags?: [string],
    hourlyRate?: number,
    efficiency?: string,
    imageUrl?: string
})  {
  try {
    const result = await Employee.update(updatedData, {
      where: {
        id: emlpoyeeId
      }
    });

    if (result[0] === 1) {
      return { success: true, message: 'Employee updated successfully.' };
    } else {
      return { success: false, message: 'Employee not found or no changes applied.' };
    }
  } catch (error) {
    console.error(error);
    throw new Error('Error while updating employee by ID in database.');
  }
}


export async function deleteEmployeeLogin(employeeId:number) {
  try {
    const result  = await EmployeeLogin.destroy({
      where: {
        employeeId: employeeId
      }
    })
    if(result === 1) {
      return { success: true, message: 'EmployeeLogin deleted successfully.'}
    } else {
      return { success: false, message: 'EmployeeLogin not found'};
    }
  } catch (error) {
    console.log(error);
    throw new Error('Error While deleteing employee login data by ID in database.')
  }
}

export async function findEmployeeBySearchTerm (searchTerm: string) {
  try {
    const employee = await Employee.findAll({
      where: { 
          [Op.or]: [
              { id: Number(searchTerm) },
              { name: {[Op.iLike]: `%${searchTerm}%`} }
          ]
      }
    })
    return employee;
  } catch (error) {
    console.log(error);
    throw new Error ('Error searching for employee.')
  }
}

export async function addOwnerToRestaurant (restaurantId: number,data: { 
    // restaurantId: number,  
    name: string,
    email: string,
 }) {
  try {
    const newEmployee = await Employee.create({...data, restaurantId});
    return newEmployee;
  } catch (error) {
    console.log(error);
    throw new Error('Error adding employee to restaurant.');
  }
}