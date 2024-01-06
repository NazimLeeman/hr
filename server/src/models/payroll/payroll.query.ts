import Employee from "../employee/employee.model";
import Payroll from "./payroll.model";

export async function createPayrollForEmployee (employeeId: number, restaurantId: number, data: { 
    hourlyRate: number,
    totalHours: number,
    totalDeduction: number,
 }) {
  try {
    let employee = await Employee.findOne({
      where: {
        id: employeeId,
        restaurantId: restaurantId
      }
    })
    if (!employee) {
      throw new Error('Employee not found.');
    }
    const payroll = await Payroll.create({ ...data, employeeId, restaurantId });
    return payroll;
  } catch (error) {
    console.log(error)
    throw new Error('Error creating schedule for employee.');
  }
}

export async function findPayrollOfEmployee (employeeId: number) {
    try {
      const employeePayroll = await Payroll.findOne({
        where: {
          employeeId: employeeId
        }
      });
      return employeePayroll;
    } catch (error) {
      throw new Error('Error finding payroll of employee.');
    }
  }