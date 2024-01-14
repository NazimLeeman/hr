import { Op } from "sequelize";
import Job from "./job.model";

export async function createJob(restaurantId: number, data: {
  jobRole: string;
  jobNature: string,
  jobDescription: string;
  experience: string;
  skillTags: [string];
  hourlyRate: number;
  applicationDeadline: Date;
  responsibilities: string[]
}) {
  try {
    const newJob = await Job.create({...data, restaurantId});
    return newJob
  }  catch (error) {
    throw new Error('Error creating new job.')
  }
}

export async function findAllJob() {
    try {
        const job = await Job.findAll({});
        return job;
    } catch (error) {
        throw new Error('Error finding job.')
    }
}

export async function findAllJobForRestaurant(restaurantId: number) {
  try {
    const job = await Job.findAll({
      where: {
        restaurantId: restaurantId
      }
    });

    return job;
  } catch (error) {
    throw new Error('Error finding jobs in restaurant.');
  }
}

export async function findJobBySearchTerm (searchTerm: string) {
  try {
    const job = await Job.findOne({
      where: { 
          [Op.or]: [
              { jobRole: {[Op.iLike]: `%${searchTerm}%`} },
              { skillTags: {[Op.overlap]: [searchTerm]} }
          ]
      }
    })
    return job;
  } catch (error) {
    console.log(error);
    throw new Error ('Error searching for job.')
  }
}