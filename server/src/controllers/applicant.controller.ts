import { Request, Response } from "express";
import { createApplicant } from "../models/applicant/applicant.query";


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

