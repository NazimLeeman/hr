import { Request, Response } from "express";
import { createApplicant, findApplicantBySearchTerm } from "../models/applicant/applicant.query";


export async function postApplicant (req: Request, res: Response) {
  try {
    const { name, email, experience, phoneNumber, address, skillTags, hourlyRate } = req.body;
    if (name && email && typeof name === 'string' && typeof email === 'string') {
      const applicant = await createApplicant({
         name, 
         email, 
         experience,
         phoneNumber,
         address,
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


export async function searchApplicant (req: Request, res: Response) {
  try {
      const search = req.query.q;
      const searchTerm = search?.toString();
  
      if (searchTerm) {
        const applicant = await findApplicantBySearchTerm(searchTerm);
        res.json({ data: applicant });
      } else res.json({ data: [] });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
}
