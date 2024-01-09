import { Request, Response } from "express";
import Applicant from "../models/applicant/applicant.model";
import Job from "../models/job/job.model";
import JobApplicant from "../models/jobApplicant/jobApplicant.model";
export async function applyJob(req: Request, res: Response) {
    try {
        const  applicantId  = Number(req.params.applicantId); 
        const { jobId } = req.body; 
    
        const job = await Job.findByPk(jobId);
        const applicant = await Applicant.findByPk(applicantId);
    
        if (!job || !applicant) {
          return res.status(404).json({ error: 'Job or applicant not found.' });
        }
    
        const jobApplicant = await JobApplicant.create({
          jobId: job.id,
          applicantId: applicant.id,
        });
    
        return res.status(201).json({ message: 'Application successful.', jobApplicant });
      } catch (error) {
        console.error('Error applying for job:', error);
        return res.status(500).json({ error: 'Internal server error.' });
      }
  }


