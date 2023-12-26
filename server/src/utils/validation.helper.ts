import { IEmployee } from "../interfaces/employee.interface";
import { IUser } from "../interfaces/user.interface";

export function validateEmployeeData(data: any): data is IEmployee {
  return (
    typeof data === 'object' &&
    typeof data.name === 'string' &&
    typeof data.email === 'string' 
  );
}

export function validateLoginData(data: any): data is { email: string, password: string, service: string } {
  return (
    typeof data === 'object' &&
    typeof data.email === 'string' &&
    typeof data.password === 'string' &&
    typeof data.service === 'string'
  );
}

export function validateServices (data: any) : data is string[] {
  if (!Array.isArray(data)) return false;
  return data.reduce((flag: boolean, item) => typeof item === 'string' ? flag : false, true);
}