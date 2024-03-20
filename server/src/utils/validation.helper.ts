import { IEmployeeLogin } from "../interfaces/employee.interface";

export function validateEmployeeData(data: IEmployeeLogin): data is IEmployeeLogin {
  return (
    typeof data === 'object' &&
    typeof data.name === 'string' &&
    typeof data.email === 'string' 
  );
}

export function validateLoginData(data: IEmployeeLogin): data is IEmployeeLogin {
  return (
    typeof data === 'object' &&
    typeof data.email === 'string' &&
    typeof data.password === 'string' 
  );
}

export function validateServices (data: any) : data is string[] {
  if (!Array.isArray(data)) return false;
  return data.reduce((flag: boolean, item) => typeof item === 'string' ? flag : false, true);
}