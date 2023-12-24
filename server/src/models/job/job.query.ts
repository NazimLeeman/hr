import { Op } from "sequelize";
import Job from "./job.model";

export async function createJob(data: {
  jobRole: string;
  experience: string;
  skillTags: string;
  hourlyRate: number;
}) {
  try {
    const newJob = await Job.create(data);
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

export async function findJobBySearchTerm (searchTerm: string) {
  try {
    const job = await Job.findAll({
      where: { 
          [Op.or]: [
              { jobRole: {[Op.iLike]: `%${searchTerm}%`} },
              { skillTags: {[Op.iLike]: `%${searchTerm}%`} }
          ]
      }
    })
    return job;
  } catch (error) {
    console.log(error);
    throw new Error ('Error searching for job.')
  }
}