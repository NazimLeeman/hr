import { Request, Response } from "express";
import Applicant from "../models/applicant/applicant.model";
import Job from "../models/job/job.model";
import JobApplicant from "../models/jobApplicant/jobApplicant.model";
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

  export async function getApplicantsForRestaurant(req: Request, res: Response) {
    try {
        const { restaurantId } = req.params;
        const applicants = await Applicant.findAll({
          include: [
            {
              model: Job,
              through: { where: { restaurantId } }, 
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


//   export async function getApplicationsForApplicant(req: Request, res: Response) {
//     try {
//       const { applicantId } = req.params;
  
//       // Assuming applicantId is a valid number
//       const applicant = await Applicant.findByPk(applicantId, {
//         include: [
//             {
//                 model: Job,
//                 include: [{ model: Restaurant }],
//               },
//         ],
//       });
  
//       if (!applicant) {
//         return res.status(404).json({ error: 'Applicant not found.' });
//       }
  
//       const applications = applicant.Jobs.map((job) => ({
//         jobId: job.id,
//         jobRole: job.jobRole,
//         restaurant: job.Restaurant,
//         // Add other relevant job details if needed
//       }));
  
//       return res.status(200).json({ applications });
//     } catch (error) {
//       console.error('Error getting applications for applicant:', error);
//       console.error('Params:', req.params);
//       return res.status(500).json({ error: 'Internal server error.' });
//     }
//   }
  
