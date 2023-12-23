import Employee from "../employee/employee.model";
import Position from "./position.model";

export async function createPositionForEmployee (employeeId: number, restaurantId: number, data: { 
    name: string
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
    const newPosition = await Position.create({ ...data, employeeId, restaurantId });
    return newPosition;
  } catch (error) {
    console.log(error)
    throw new Error('Error creating position for employee.');
  }
}