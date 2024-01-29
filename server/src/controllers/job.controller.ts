import { Request, Response } from "express";
import { createJob, deleteJob, findAllFullTimeJob, findAllJob, findAllJobForRestaurant, findAllPartTimeJob, findJobBySearchTerm } from "../models/job/job.query";
import { AuthRequest } from "../interfaces/authRequest.interface";

export async function postJob (req: AuthRequest, res: Response) {
    try {
        // const restaurantId = Number(req.params.restaurantId);
        const restaurantId = req.user?.employeeInformation.restaurantId
        const { jobRole, jobNature, jobDescription, experience, skillTags, hourlyRate, applicationDeadline, responsibilities} = req.body;
        const data = { jobRole, jobNature, jobDescription, experience, skillTags, hourlyRate, applicationDeadline, responsibilities}
        if (restaurantId && jobRole && experience && skillTags && hourlyRate) {
            const job = await createJob(restaurantId, data);
            res.status(201).json(job);
        } else res.status(400).json({message: 'Invalid job fields.'})
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export async function getAllJob (req: Request, res: Response) {
    try {
        const jobs = await findAllJob();
        res.json({ data: jobs });
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }    
}

export async function getAllPartTimeJobs (req: Request, res: Response) {
    try {
        const jobs = await findAllPartTimeJob();
        res.json({ data: jobs });
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }    
}

export async function getAllFullTimeJobs (req: Request, res: Response) {
    try {
        const jobs = await findAllFullTimeJob();
        res.json({ data: jobs });
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }    
}

export async function getAllJobForRestaurant(req: AuthRequest, res: Response) {
    try {
        // const restaurantId = Number(req.params.restaurantId);
        const restaurantId = req.user?.employeeInformation.restaurantId;
        if (restaurantId) {     
            const jobs = await findAllJobForRestaurant(restaurantId);
            res.json({ data: jobs });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export async function searchJob (req: Request, res: Response) {
    const searchTerm = req.query.searchTerm as string;
    console.log(searchTerm)
    try {
        if (searchTerm) {
            console.log(searchTerm)
          const job = await findJobBySearchTerm(searchTerm);
          res.json({ data: job });
        } else res.json({ data: [] });
      } catch (error) {
        console.log(error);
        console.log('Hello');
        res.status(500).json(error);
      }
}

export async function deleteJobInfo (req: Request, res: Response) {
    const jobId = Number(req.params.jobId);
    try {
        const result = await deleteJob(jobId);
          if (result.success) {
              return res.status(200).json({ message: result.message });
          } else {
              return res.status(404).json({ message: result.message });
          }
    } catch(error) {
        console.log(error);
        res.status(500).json(error)
    }
}

export async function masterJob(req: Request, res: Response) {
    try {
        const jobsData = req.body; // Assuming req.body is an array of job objects
        const createdJobs = [];

        for (const jobData of jobsData) {
            const { restaurantId, jobRole, jobNature, jobDescription, experience, skillTags, hourlyRate, applicationDeadline, responsibilities } = jobData;
            const data = { jobRole, jobNature, jobDescription, experience, skillTags, hourlyRate, applicationDeadline, responsibilities };

            if (restaurantId && jobRole && experience && skillTags && hourlyRate) {
                const job = await createJob(restaurantId, data);
                createdJobs.push(job);
            } else {
                // If any job data is missing, skip creating the job and log an error
                console.error('Invalid job fields for job:', jobData);
            }
        }

        res.status(201).json(createdJobs);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}
