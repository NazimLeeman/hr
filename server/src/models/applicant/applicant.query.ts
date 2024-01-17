import { Op } from "sequelize";
import Applicant from "./applicant.model";
import { IApplicant } from "../../interfaces/applicant.interface";
import ApplicantLogin from "../applicantLogin/applicantLogin.model";

// export async function findAllApplicant() {
//   try {
//     const applicant = await Applicant.findAll({});
//     return applicant;
//   } catch (error) {
//     throw new Error('Error finding applicant.');
//   }
// }

export async function createApplicant(data: {
    name: string, 
    email: string,
    experience?: [string],
    phoneNumber?: number,
    address?: string,
    skillTags?: [string],
    hourlyRate?: number,
    imageUrl?: string
}) {
    try {
        const newApplicant = await Applicant.create(data);
        return newApplicant;
    } catch (error) {
      console.log(error)
        throw new Error('Error creating new applicant.')
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
export async function findAllApplicantLogin() {
  try {
    const applicant = await ApplicantLogin.findAll({});
    return applicant;
  } catch (error) {
    throw new Error('Error finding applicant.');
  }
}

// export async function findApplicantById(id: number) {
//   try {
//     const employee = await Applicant.findAll({
//       where: {
//         applicantId: id
//       }
//     });
//     return employee;
//   } catch (error) {
//     throw new Error('Error finding applicant.')
//   }
// }

export async function findApplicantBySearchTerm (searchTerm: string) {
    try {
      const applicant = await Applicant.findAll({
        where: { 
            [Op.or]: [
                { experience: {[Op.overlap]: [searchTerm]} },
                { skillTags: {[Op.overlap]: [searchTerm]} }
                // { experience: {[Op.iLike]: `%${searchTerm}%`} },
                // { skillTags: {[Op.iLike]: `%${searchTerm}%`} }
            ]
        }
      })
      return applicant;
    } catch (error) {
      console.log(error);
      throw new Error ('Error searching for applicant.')
    }
  }

  export async function findApplicantById(ApplicantId: number) {
    try {
        const applicant = await Applicant.findByPk(ApplicantId);
        return applicant;  
    } catch (error) {
        console.log(error);
        throw new Error('Error while finding applicant by ID in database');
    }
  }

  export async function deleteApplicantById(applicantId: number) {
    try {
      const result  = await Applicant.destroy({
        where: {
          id: applicantId
        }
      })
      if(result === 1) {
        return { success: true, message: 'Applicant deleted successfully.'}
      } else {
        return { success: false, message: 'Applicant not found'};
      }
    } catch (error) {
      console.log(error);
      throw new Error('Error While deleteing applicant by ID in database.')
    }

  }

  export async function updateApplicantById(applicantId: number, updatedData: {
    name?: string, 
    email?: string,
    experience?: [string],
    phoneNumber?: number,
    address?: string,
    skillTags?: [string],
    hourlyRate?: number,
    imageUrl?: string,
    availability?: [string]
  })  {
    try {
      const result = await Applicant.update(updatedData, {
        where: {
          id: applicantId
        }
      });
  
      if (result[0] === 1) {
        return { success: true, message: 'Applicant updated successfully.' };
      } else {
        return { success: false, message: 'Applicant not found or no changes applied.' };
      }
    } catch (error) {
      console.error(error);
      throw new Error('Error while updating applicant by ID in database.');
    }
  }
  

  export async function deleteApplicantLogin(applicantId:number) {
    try {
      const result  = await ApplicantLogin.destroy({
        where: {
          applicantId: applicantId
        }
      })
      if(result === 1) {
        return { success: true, message: 'ApplicantLogin deleted successfully.'}
      } else {
        return { success: false, message: 'ApplicantLogin not found'};
      }
    } catch (error) {
      console.log(error);
      throw new Error('Error While deleteing applicant login data by ID in database.')
    }
  }