import { IApplicantLogin } from '../../interfaces/applicantLogin.interface'
import ApplicantLogin from "./applicantLogin.model";

export async function findApplicantLoginByEmail(email: string) {
    try {
        const login = await ApplicantLogin.findOne({ 
            where: {
                email: email
            }
         })
         return login;
    } catch (error) {
        console.log(error);
        throw new Error('Error while finding applicant login with email from database.')
    }
}

export async function createApplicantLogin (data: IApplicantLogin) {
    try {
        const login = await ApplicantLogin.create(data);
        return login;
    } catch (error) {
        console.log(error);
        throw new Error('Error wile creating applicant login in database.')
    }
}

export async function findApplicantLoginData(applicantId: number) {
    try {
        const loginData = await ApplicantLogin.findOne({
            where: {
                applicantId: applicantId
            }
        });
        return loginData;
    } catch (error) {
        console.log(error);
        throw new Error('Error while finding applicant login data by applicantId from the database.');
    }
}


