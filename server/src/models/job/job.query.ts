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
    const job = await Job.findAll({
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

export async function findAllPartTimeJob() {
  try {
      const job = await Job.findAll({
        where: {
          jobNature: {
            [Op.iLike]: '%Part-Time%',
          }
        } 
      });
      return job;
  } catch (error) {
      throw new Error('Error finding partTime job.')
  }
}

export async function findAllFullTimeJob() {
  try {
    const job = await Job.findAll({
      where: {
        jobNature: {
          [Op.iLike]: '%Full-Time%',
        }
      } 
    });
    return job;
  } catch (error) {
      throw new Error('Error finding fullTime job.')
  }
}

export async function deleteJob(jobId: number) {
  try {
    const result  = await Job.destroy({
      where: {
        id: jobId
      }
    })
    if(result === 1) {
      return { success: true, message: 'Job Info deleted successfully.'}
    } else {
      return { success: false, message: 'Job Info not found'};
    }
  } catch (error) {
    console.log(error);
    throw new Error('Error While deleteing Job Info by ID in database.')
  }
}