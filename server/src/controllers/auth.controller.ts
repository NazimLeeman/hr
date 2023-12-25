import bcrypt from 'bcryptjs';
import { Request, Response } from "express";
import { validateLoginData, validateUserData } from "../utils/validation.helper"
import { createUserLogin, findUserLoginByEmail } from "../models/userLogin/userLogin.query";
import { createUser, findUserById } from "../models/user/user.query";
import { checkUserServiceAccess, createUserServiceAccess } from '../models/serviceAccess/serviceAccess.query';

export async function signUp (req: Request, res: Response) {
  try {
    const { name, email, password, role } = req.body;
    const data = { name, email, password, role };

    if (validateUserData({ name, email, password, role })) {
      const loginCheck = await findUserLoginByEmail(email);

      if (!loginCheck) {
        const newUser = await createUser(data);

        const salt = bcrypt.genSaltSync();
        const encryptedPassword =  bcrypt.hashSync(password, salt);
        const loginData = {
          email,
          password: encryptedPassword,
          userId: newUser.id
        }
        
        await createUserLogin(loginData);

        if (data.role === 'admin') {
          await createUserServiceAccess({ userId: newUser.id, services: ["all"] });
        }

        res.status(201).send({ status: 'success', user: newUser });
      } else res.status(400).send({message: 'An account with this email already exists.'});
    } else res.status(400).send({message: 'Invalid data.'});
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
}

export async function login (req: Request, res: Response) {
  try {
    const { email, password, service } = req.body;

    if (validateLoginData({ email, password, service })) {
      const login = await findUserLoginByEmail(email);

      if (login) {
        if (bcrypt.compareSync(password, login.password)) {
          const user = await findUserById(login.userId);

          if (user) {
            const accessCheck = await checkUserServiceAccess(user.id, service);
            if (accessCheck) res.status(200).send({ status: 'success', user });
            else res.status(403).send({ message: 'You do not have access to this service.' });
          } else res.status(400).send({ message: 'This account is no longer in service.' });
          
        } else res.status(401).send({ message: 'Invalid password for this login.' });
      } else res.status(400).send({ message: 'There have been no accounts created with this email.' });
    } else res.status(400).send({ message: 'Invalid data.' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
}