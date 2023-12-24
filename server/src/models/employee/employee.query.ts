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


export async function addEmployeeToRestaurant (restaurantId: number, data: { 
    name: string, 
    email: string,
    experience: string,
    phoneNumber: number,
    // joiningDate: Date,
    address: string,
    skillTags: string,
    hourlyRate: number,
    position: string
    // positionId: number,
    // applicantId: number
 }) {
  try {
    const newEmployee = await Employee.create({ ...data, restaurantId });
    return newEmployee;
  } catch (error) {
    throw new Error('Error adding employee to restaurant.');
  }
}

export async function findAllApplicant() {
  try {
    const applicant = await Applicant.findAll({});
    return applicant;
  } catch (error) {
    throw new Error('Error finding applicant.');
  }
}

export async function addApplicantToEmployee (applicantId: number, restaurantId: number, data: { 
  name: string, 
  email: string,
  experience: string,
  phoneNumber: number,
  address: string,
  skillTags: string,
  hourlyRate: number,
  position: string
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