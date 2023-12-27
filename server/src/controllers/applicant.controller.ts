import bcrypt from 'bcryptjs';
import { Request, Response } from "express";
import { createApplicant, findAllApplicant, findApplicantById, findApplicantBySearchTerm } from "../models/applicant/applicant.query";
import { createApplicantLogin, findApplicantLoginByEmail } from "../models/applicantLogin/applicantLogin.query";


export async function postApplicant (req: Request, res: Response) {
  try {
    const { name, email, password, experience, phoneNumber, address, skillTags, hourlyRate } = req.body;
    if (name && email && typeof name === 'string' && typeof email === 'string') {
      const loginCheck = await findApplicantLoginByEmail(email);
      if(!loginCheck) {
        const newApplicant = await createApplicant({
          name, 
          email, 
          experience,
          phoneNumber,
          address,
          skillTags,
          hourlyRate,
          });

        const salt = bcrypt.genSaltSync();
        const encryptedPassword = bcrypt.hashSync(password, salt);
        const loginData = {
          email,
          password: encryptedPassword,
          applicantId: newApplicant.id
        }
        await createApplicantLogin(loginData);
        res.status(201).send({ status: 'success', user: newApplicant });
      } else res.status(400).send({message: 'An account with this email already exists.'});
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


export async function getAllApplicant (req: Request, res: Response) {
  try {
    const applicants = await findAllApplicant();
    res.json({ data: applicants });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function login (req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if ( typeof email === "string" && typeof password === "string") {
      const login = await findApplicantLoginByEmail(email);
      if (login) {
        if (bcrypt.compareSync(password, login.password)) {
          const applicant = await findApplicantById(login.applicantId);
          if (applicant) {
            res.status(200).send({ status: 'success', applicant});
          } else res.status(400).send({ message: 'This is account is no longer in service.'})
        } else res.status(401).send({ message: 'Invalid password for this login.'})
      } else res.status(400).send({ message: 'There have been no accounts created with this email.' });
    } else res.status(400).send({ message: 'Invalid data.' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message})
  }
}