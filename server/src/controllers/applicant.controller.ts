import { Request, Response } from "express";
import { createApplicant, findAllApplicant } from "../models/applicant/applicant.query";

export async function getAllApplicant (req: Request, res: Response) {
  try {
    const applicants = await findAllApplicant();
    res.json({ data: applicants });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}


export async function postApplicant (req: Request, res: Response) {
  try {
    const { applicantName, email, experience, phoneNumber, skillTags, hourlyRate } = req.body;
    if (applicantName && email && typeof applicantName === 'string' && typeof email === 'string') {
      const applicant = await createApplicant({
         applicantName, 
         email, 
         experience,
         phoneNumber,
         skillTags,
         hourlyRate,
         });
      res.status(201).json(applicant);
    } else res.status(400).json({message: 'Invalid applicant fields.'});
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}