import { Request, Response } from "express";
import { createJob, findAllJob, findJobBySearchTerm } from "../models/job/job.query";

export async function postJob (req: Request, res: Response) {
    try {
        const { jobRole, jobNature, jobDescription, experience, skillTags, hourlyRate, applicationDeadline, responsibilities} = req.body;
        if (jobRole && experience && skillTags && hourlyRate) {
            const job = await createJob({
                jobRole, jobNature, jobDescription, experience, skillTags, hourlyRate, applicationDeadline, responsibilities
            });
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

export async function searchJob (req: Request, res: Response) {
    try {
        const search = req.query.q;
        const searchTerm = search?.toString();
    
        if (searchTerm) {
          const job = await findJobBySearchTerm(searchTerm);
          res.json({ data: job });
        } else res.json({ data: [] });
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
}