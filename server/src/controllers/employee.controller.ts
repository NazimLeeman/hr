import bcrypt from 'bcryptjs';
import { checkEmployeeServiceAccess } from '../models/position/position.query';
import { Request, Response } from "express";
import { findAllEmployeeInRestaurant, addEmployeeToRestaurant, addApplicantToEmployee, findEmployeeById, updateEmployeeInformation } from "../models/employee/employee.query";
import { findEmployeeLoginByEmail, createEmployeeLogin } from "../models/employeeLogin/employeeLogin.query";
import { validateLoginData, validateEmployeeData } from "../utils/validation.helper";

export async function getAllEmployeeOfRestaurant (req: Request, res: Response) {
    try {
      let id = req.params.id;
      const restaurantId = Number(id);
      if (id && restaurantId) {
        const employee = await findAllEmployeeInRestaurant(restaurantId);
        res.json({ data: employee });
      } else res.status(400).json({ message: "Invalid restaurant ID." });
  
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
  
  // export async function postEmployeeToRestaurant (req: Request, res: Response) {
  //   try {
  //     let id = req.params.id;
  //     const restaurantId = Number(id);
  //     if (id && restaurantId) {
  //       const { name, email, experience, phoneNumber, address, skillTags, hourlyRate, position } = req.body;
  //       if (
  //           typeof name === 'string' &&
  //           typeof email === 'string' &&
  //           typeof phoneNumber === 'number') {
  //         const employee = await addEmployeeToRestaurant(restaurantId, {name, email, experience, phoneNumber, address, skillTags, hourlyRate, position});
  //         res.status(201).json(employee);
  //       } else res.status(400).json({ message: "Invalid employee information." });
  //     } else res.status(400).json({ message: "Invalid restaurant ID." });
  
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json(error);
  //   }
  // }


  export async function postEmployeeToRestaurant (req: Request, res: Response) {
    try {
      const { restaurantId, name, email, password, experience, phoneNumber, address, skillTags, hourlyRate } = req.body;
      const data = { restaurantId, name, email, experience, phoneNumber, address, skillTags, hourlyRate };
  
      if (validateEmployeeData({ name, email, password })) {
        const loginCheck = await findEmployeeLoginByEmail(email);
  
        if (!loginCheck) {
          const newEmployee = await addEmployeeToRestaurant(data);
  
          const salt = bcrypt.genSaltSync();
          const encryptedPassword =  bcrypt.hashSync(password, salt);
          const loginData = {
            email,
            password: encryptedPassword,
            employeeId: newEmployee.id
          }
          
          await createEmployeeLogin(loginData);
  
          // if (data.role === 'admin') {
          //   await createUserServiceAccess({ userId: newEmployee.id, services: ["all"], position: "owner" });
          // }
  
          res.status(201).send({ status: 'success', user: newEmployee });
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
      const login = await findEmployeeLoginByEmail(email);

      if (login) {
        if (bcrypt.compareSync(password, login.password)) {
          const employee = await findEmployeeById(login.employeeId);

          if (employee) {
            const accessCheck = await checkEmployeeServiceAccess(employee.id, service);
            if (accessCheck) res.status(200).send({ status: 'success', employee });
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

  
  export async function postApplicantToEmployee (req: Request, res: Response) {
    try {
      let id = req.params.id;
      const restaurantId = Number(id);
      const applicantId = Number(req.params.applicantId);
      if (id && applicantId && restaurantId) {
        const { name, email, experience, phoneNumber, address, skillTags, hourlyRate} = req.body;
        if (
            typeof name === 'string' &&
            typeof email === 'string' &&
            typeof phoneNumber === 'number') {
          const employee = await addApplicantToEmployee(applicantId, restaurantId, {name, email, experience, phoneNumber, address, skillTags, hourlyRate});
          res.status(201).json(employee);
        } else res.status(400).json({ message: "Invalid employee information." });
      } else res.status(400).json({ message: "Invalid applicant or restaurant ID." });
  
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  export async function updateInformationOfEmployee (req: Request, res: Response) {
    try {
        const employeeId = Number(req.params.employeeId);
        if (employeeId) {
            const { restaurantId, name, email, experience, phoneNumber, address, skillTags, hourlyRate, positionId } = req.body;
            if (
                typeof restaurantId === 'number' &&
                typeof name === 'string' &&
                typeof email === 'string') {
              const information = await updateEmployeeInformation( employeeId, {restaurantId, name, email, experience, phoneNumber, address, skillTags, hourlyRate, positionId});
              res.status(201).json(information);
            } else res.status(400).json({ message: "Invalid employee ID." });
          } else res.status(400).json({ message: "Invalid information ID." });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
  }