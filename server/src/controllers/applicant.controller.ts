import { Request, Response } from "express";
import { createApplicant } from "../models/applicant/applicant.query";

// export async function getAllApplicant (req: Request, res: Response) {
//   try {
//     const applicants = await findAllApplicant();
//     res.json({ data: applicants });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error);
//   }
// }


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

// export async function postApplicantToEmployee (req: Request, res: Response) {
//   try {
//     let id = req.params.id;
//     const restaurantId = Number(id);
//     const applicantId = Number(req.params.applicantId);
//     if (id && applicantId && restaurantId) {
//       const { name, email, experience, phoneNumber, address, skillTags, hourlyRate } = req.body;
//       if (
//           typeof name === 'string' &&
//           typeof email === 'string' &&
//           typeof phoneNumber === 'number') {
//         const employee = await addApplicantToEmployee(applicantId, restaurantId, {name, email, experience, phoneNumber, address, skillTags, hourlyRate});
//         res.status(201).json(employee);
//       } else res.status(400).json({ message: "Invalid employee information." });
//     } else res.status(400).json({ message: "Invalid applicant or restaurant ID." });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error);
//   }
// }