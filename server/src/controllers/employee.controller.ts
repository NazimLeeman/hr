import bcrypt from "bcryptjs";
import {
  checkEmployeeServiceAccess,
  createOwnerServiceAccess,
  getEmployeeInfo,
  getEmployeeServiceAccess,
} from "../models/position/position.query";
import { Request, Response } from "express";
import {
  findAllEmployeeInRestaurant,
  addEmployeeToRestaurant,
  addApplicantToEmployee,
  findEmployeeById,
  deleteEmployeeById,
  deleteEmployeeLogin,
  findEmployeeBySearchTerm,
  updateEmployeeById,
  updateEmployeeInformation,
  addOwnerToRestaurant,
  addEmployeesToRestaurant,
} from "../models/employee/employee.query";
import {
  findEmployeeLoginByEmail,
  createEmployeeLogin,
} from "../models/employeeLogin/employeeLogin.query";
import {
  validateLoginData,
  validateEmployeeData,
} from "../utils/validation.helper";
import { AuthRequest } from "../interfaces/authRequest.interface";

export async function getAllEmployeeOfRestaurant(
  req: AuthRequest,
  res: Response
) {
  try {
    const restaurantId = req.user?.employeeInformation.restaurantId;
    if (restaurantId) {
      const employee = await findAllEmployeeInRestaurant(restaurantId);
      res.json({ data: employee });
    } else res.status(400).json({ message: "Invalid restaurant ID." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function postEmployeeToRestaurant(
  req: AuthRequest,
  res: Response
) {
  try {
    const restaurantId = req.user?.employeeInformation.restaurantId;
    const {
      name,
      email,
      password,
      phoneNumber,
      address,
      hourlyRate,
      imageUrl,
    } = req.body;
    const data = { name, email, phoneNumber, address, hourlyRate, imageUrl };

    if (validateEmployeeData({ name, email, password })) {
      const loginCheck = await findEmployeeLoginByEmail(email);

      if (!loginCheck && restaurantId) {
        const newEmployee = await addEmployeeToRestaurant(restaurantId, data);

        const salt = bcrypt.genSaltSync();
        const encryptedPassword = bcrypt.hashSync(password, salt);
        const loginData = {
          email,
          password: encryptedPassword,
          employeeId: newEmployee.id,
        };

        await createEmployeeLogin(loginData);

        res.status(201).send({ status: "success", user: newEmployee });
      } else
        res
          .status(400)
          .send({ message: "An account with this email already exists." });
    } else res.status(400).send({ message: "Invalid data." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (validateLoginData({ email, password })) {
      const login = await findEmployeeLoginByEmail(email);

      if (login) {
        if (bcrypt.compareSync(password, login.password)) {
          const employee = await findEmployeeById(login.employeeId);

          if (employee) {
            res.status(200).send({ status: "success", employee });
          } else
            res
              .status(400)
              .send({ message: "This account is no longer in service." });
        } else
          res.status(401).send({ message: "Invalid password for this login." });
      } else
        res.status(400).send({
          message: "There have been no accounts created with this email.",
        });
    } else res.status(400).send({ message: "Invalid data." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
}

export async function postApplicantToEmployee(req: AuthRequest, res: Response) {
  try {
    const restaurantId = req.user?.employeeInformation.restaurantId;
    const applicantId = Number(req.params.applicantId);
    if (applicantId && restaurantId) {
      const {
        name,
        email,
        experience,
        phoneNumber,
        address,
        skillTags,
        hourlyRate,
        imageUrl,
      } = req.body;
      if (
        typeof name === "string" &&
        typeof email === "string" &&
        typeof phoneNumber === "number"
      ) {
        const employee = await addApplicantToEmployee(
          applicantId,
          restaurantId,
          {
            name,
            email,
            experience,
            phoneNumber,
            address,
            skillTags,
            hourlyRate,
            imageUrl,
          }
        );
        res.status(201).json(employee);
      } else res.status(400).json({ message: "Invalid employee information." });
    } else
      res.status(400).json({ message: "Invalid applicant or restaurant ID." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function updateInformationOfEmployee(req: Request, res: Response) {
  try {
    const employeeId = Number(req.params.employeeId);
    if (employeeId) {
      const {
        restaurantId,
        name,
        email,
        experience,
        phoneNumber,
        address,
        skillTags,
        hourlyRate,
        positionId,
        imageUrl,
      } = req.body;
      if (
        typeof restaurantId === "number" &&
        typeof name === "string" &&
        typeof email === "string"
      ) {
        const information = await updateEmployeeInformation(employeeId, {
          restaurantId,
          name,
          email,
          experience,
          phoneNumber,
          address,
          skillTags,
          hourlyRate,
          positionId,
          imageUrl,
        });
        res.status(201).json(information);
      } else res.status(400).json({ message: "Invalid employee ID." });
    } else res.status(400).json({ message: "Invalid information ID." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function deleteEmployee(req: Request, res: Response) {
  const employeeId = Number(req.params.employeeId);
  try {
    const result = await deleteEmployeeById(employeeId);

    if (result.success) {
      const loginData = await deleteEmployeeLogin(employeeId);
      return res.status(200).json({ message: result.message });
    } else {
      return res.status(404).json({ message: result.message });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateEmployee(req: Request, res: Response) {
  const employeeId = parseInt(req.params.employeeId, 10);
  const updatedData = req.body;

  try {
    const result = await updateEmployeeById(employeeId, updatedData);

    if (result.success) {
      return res.status(200).json({ message: result.message });
    } else {
      return res.status(404).json({ message: result.message });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteEmployeeLoginData(req: Request, res: Response) {
  const employeeId = Number(req.params.employeeId);
  try {
    const result = await deleteEmployeeLogin(employeeId);
    if (result.success) {
      return res.status(200).json({ message: result.message });
    } else {
      return res.status(404).json({ message: result.message });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function searchEmployee(req: Request, res: Response) {
  try {
    const search = req.query.q;
    const searchTerm = search?.toString();

    if (searchTerm) {
      const job = await findEmployeeBySearchTerm(searchTerm);
      res.json({ data: job });
    } else res.json({ data: [] });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function serviceAccess(req: Request, res: Response) {
  try {
    const employeeId = Number(req.params.userId);
    const result = await getEmployeeServiceAccess(employeeId);
    if (result) {
      return res.status(200).json({ message: result });
    } else {
      return res.status(404).json({ message: result });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function CheckServiceAccess(req: Request, res: Response) {
  try {
    const { userId, service } = req.body;
    const result = await checkEmployeeServiceAccess(userId, service);
    if (result) {
      return res.status(200).json({ status: "success", auth: true });
    } else {
      return res.status(404).json({ message: result });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function getUserInfo(req: Request, res: Response) {
  try {
    const employeeId = Number(req.params.userId);
    const result = await getEmployeeInfo(employeeId);
    if (result) {
      return res.status(200).json({ user: result });
    } else {
      return res.status(404).json({ user: result });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function createRestaurantOwner(req: Request, res: Response) {
  try {
    const { restaurantId, name, email, password } = req.body;
    const data = { name, email };

    if (validateEmployeeData({ name, email, password })) {
      const loginCheck = await findEmployeeLoginByEmail(email);

      if (!loginCheck) {
        const newEmployee = await addOwnerToRestaurant(restaurantId, data);

        const salt = bcrypt.genSaltSync();
        const encryptedPassword = bcrypt.hashSync(password, salt);
        const loginData = {
          email,
          password: encryptedPassword,
          employeeId: newEmployee.id,
        };

        await createEmployeeLogin(loginData);
        await createOwnerServiceAccess({
          employeeId: newEmployee.id,
          services: ["all"],
          position: "owner",
          restaurantId: restaurantId,
        });

        res.status(201).send({ status: "success", user: newEmployee });
      } else
        res
          .status(400)
          .send({ message: "An account with this email already exists." });
    } else res.status(400).send({ message: "Invalid data." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
}

export async function createRestaurantOwners(req: Request, res: Response) {
  try {
    const ownersData = req.body.data;
    for (const owner of ownersData) {
      const { name, email, password, restaurantId } = owner;
      const data = { name, email };
      const loginCheck = await findEmployeeLoginByEmail(email);
      const newEmployee = await addOwnerToRestaurant(restaurantId, data);
      const loginData = { employeeId: newEmployee.id, email, password };
      await createEmployeeLogin(loginData);
      await createOwnerServiceAccess({
        employeeId: newEmployee.id,
        services: ["all"],
        position: "owner",
        restaurantId: restaurantId,
      });
    }
    res.status(201).send({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
}

export async function postManyEmployeesToRestaurant(
  req: Request,
  res: Response
) {
  try {
    const employeesData = req.body.data;
    for (const datas of employeesData) {
      const {
        name,
        email,
        password,
        address,
        hourlyRate,
        restaurantId,
        position,
      } = datas;
      const data = { name, email, address, hourlyRate };

      if (validateEmployeeData({ name, email, password })) {
        const loginCheck = await findEmployeeLoginByEmail(email);

        if (!loginCheck && restaurantId) {
          const newEmployee = await addEmployeesToRestaurant(
            restaurantId,
            data
          );

          const loginData = {
            email,
            password,
            employeeId: newEmployee.id,
          };

          await createEmployeeLogin(loginData);
          await createOwnerServiceAccess({
            employeeId: newEmployee.id,
            services: ["all"],
            position: position,
            restaurantId: restaurantId,
          });
        }
      }
    }
    res.status(201).send({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
}
