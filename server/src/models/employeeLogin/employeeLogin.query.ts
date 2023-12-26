import { IEmployeeLogin } from '../../interfaces/employeeLogin.interface'
import Employee from '../employee/employee.model';
import EmployeeLogin from "./employeeLogin.model";

export async function findEmployeeLoginByEmail(email: string) {
    try {
        const login = await EmployeeLogin.findOne({ 
            where: {
                email: email
            }
         })
         return login;
    } catch (error) {
        console.log(error);
        throw new Error('Error while finding employee login with email from database.')
    }
}

export async function createEmployeeLogin (data: IEmployeeLogin) {
    try {
        const login = await EmployeeLogin.create(data);
        return login;
    } catch (error) {
        console.log(error);
        throw new Error('Error wile creating employee login in database.')
    }
}

export async function updateEmployeePositionId(id: number, positionId: number) {
    try {
      const employee = await Employee.findByPk(id);
  
      if (!employee) {
        throw new Error('Employee not found with the given ID');
      }
  
      employee.positionId = positionId;
      await employee.save();
  
      return employee;
    } catch (error) {
      console.error(error);
      throw new Error('Error while updating employee position in database');
    }
  }