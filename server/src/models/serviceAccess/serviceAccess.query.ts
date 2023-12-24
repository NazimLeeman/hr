import { IServiceAccess } from "../../interfaces/serviceAccess.interface";
import ServiceAccess from "./serviceAccess.model";

export async function createUserServiceAccess(data: IServiceAccess) {
    try {
        const access = await ServiceAccess.create(data);
        return access;
    } catch (error) {
        console.log(error);
        throw new Error('Error while creating user service in database.')
    }
}

export async function updateUserServiceAccess(serviceAccessId: number, data: IServiceAccess) {
    try {
        const existingServiceAccess = await ServiceAccess.findOne({
            where: {
                id: serviceAccessId
            }
        })
        if (!existingServiceAccess) {
            throw new Error ('Service not found')
        }
        const updatedServiceAccess = await existingServiceAccess.update(data);
        return updatedServiceAccess;
    } catch (error) {
        console.log(error);
        throw new Error('Error while updating user service in database.')
    }
}

export async function findUserServiceAccess(userId:number) {
    try {
        const access = await ServiceAccess.findOne({
            where: {
                id: userId
            }
        })
        return access;
    } catch (error) {
        console.log(error);
        throw new Error('Error while getting user service access from database.')
    }
}

export async function checkUserServiceAccess(userId:number, service: string) {
    try {
        const userServiceAccess = await ServiceAccess.findOne({
            where: {
                id: userId
            }
        })
        if (userServiceAccess) {
            return (userServiceAccess.services.includes('all') || userServiceAccess.services.includes(service));        
        }
        return false;
    } catch (error) {
        console.log(error);
        throw new Error('Error while checking user service access from database.')
    }
}