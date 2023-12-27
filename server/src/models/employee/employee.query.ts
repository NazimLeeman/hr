import Employee from "./employee.model";
import Applicant from "../applicant/applicant.model";

export async function findAllEmployeeInRestaurant (id: number) {
  try {
    const employee = await Employee.findAll({
      where: {
        restaurantId: id
      }
    });

    return employee;
  } catch (error) {
    throw new Error('Error finding employee in restaurant.');
  }
}


export async function addEmployeeToRestaurant (data: { 
    restaurantId: number,  
    name: string,
    email: string,
    experience: string,
    phoneNumber: number,
    address: string,
    skillTags: string,
    hourlyRate: number,
    // position: string
    // positionId: number,
    // applicantId: number
 }) {
  try {
    const newEmployee = await Employee.create(data);
    return newEmployee;
  } catch (error) {
    console.log(error);
    throw new Error('Error adding employee to restaurant.');
  }
}


export async function addApplicantToEmployee (applicantId: number, restaurantId: number, data: { 
  name: string, 
  email: string,
  experience: string,
  phoneNumber: number,
  address: string,
  skillTags: string,
  hourlyRate: number
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
    experience?: string,
    phoneNumber?: number,
    address?: string,
    skillTags?: string,
    hourlyRate?: number,
    positionId?: number
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