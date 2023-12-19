import Applicant from "./applicant.model";

export async function findAllApplicant() {
  try {
    const applicant = await Applicant.findAll({});
    return applicant;
  } catch (error) {
    throw new Error('Error finding applicant.');
  }
}

export async function createApplicant(data: {
    applicantName: string, 
    email: string,
    experience: string,
    phoneNumber: number,
    skillTags: string,
    hourlyRate: number
}) {
    try {
        const newApplicant = await Applicant.create(data);
        return newApplicant;
    } catch (error) {
        throw new Error('Error creating new applicant.')
    }
}


export async function addApplicantToRestaurant (restaurantId: number, data: { 
    applicantName: string, 
    email: string,
    experience: string,
    phoneNumber: number,
    skillTags: string,
    hourlyRate: number,
 }) {
  try {
    const newEmployee = await Applicant.create({ ...data, restaurantId });
    return newEmployee;
  } catch (error) {
    throw new Error('Error adding employee to restaurant.');
  }
}

