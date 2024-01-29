import { Request, Response } from "express";
import Applicant from "../models/applicant/applicant.model";
import Job from "../models/job/job.model";
import JobApplicant from "../models/jobApplicant/jobApplicant.model";
import { AuthRequest } from "../interfaces/authRequest.interface";
export async function applyJob(req: Request, res: Response) {
    try {
        const  applicantId  = Number(req.params.applicantId); 
        const { jobId, restaurantId } = req.body; 

        console.log('jobId:', jobId);
        console.log('applicantId:', applicantId);
    
        const job = await Job.findByPk(jobId);
        const applicant = await Applicant.findByPk(applicantId);
    
        if (!job || !applicant) {
          return res.status(404).json({ error: 'Job or applicant not found.' });
        }
    
        const jobApplicant = await JobApplicant.create({
          jobId: job.id,
          applicantId: applicant.id,
          restaurantId: restaurantId
        });
    
        return res.status(201).json({ message: 'Application successful.', jobApplicant });
      } catch (error) {
        console.error('Error applying for job:', error);
        console.error('Request Body:', req.body);
        console.error('Params:', req.params);
        return res.status(500).json({ error: 'Internal server error.' });
      }
  }

  export async function getApplicantsForRestaurant(req: AuthRequest, res: Response) {
    try {
      // const { restaurantId } = req.params;
      const restaurantId = req.user?.employeeInformation.restaurantId;
        const applicants = await JobApplicant.findAll({
          include: [
            {
                model: Job,
                where: { restaurantId },
              },
              {
                model: Applicant,
              },
          ],
        });
    
        return res.status(200).json({ applicants });
      } catch (error) {
        console.error('Error getting applicants for restaurant:', error);
        console.error('Params:', req.params);
        return res.status(500).json({ error: 'Internal server error.' });
      }
  }


export async function updateJobStatus(req: Request, res: Response) {
  try {
        const  jobApplicantId  = Number(req.params.jobApplicantId); 
        const updatedData = req.body;
    const result = await JobApplicant.update(updatedData, {
      where: {
        id: jobApplicantId
      }
    });
    if (result[0] === 1) {
      res.status(200).json({ success: true, message: 'Job applicant updated.'})
    } else {
      res.status(404).json({ success: false, message: 'Job applicant not found .'})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error while updating job applicant by ID.'})
  }
}
  
