import Employee from "../employee/employee.model";
import Attendance from "./attendance.model";

export async function createCheckInTimeForEmployee (employeeId: number, restaurantId: number, data: { 
    day: string, checkInTime: number, checkOutTime?: number
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
    const newAttendance = await Attendance.create({ ...data, employeeId, restaurantId });
    return newAttendance;
  } catch (error) {
    console.log(error)
    throw new Error('Error while checking in.');
  }
}

export async function CheckOutTimeForEmployee(employeeId: number, attendanceId: number, data: {
    day?: string, checkInTime?: number, checkOutTime: number
}) {
    try {
      let existingAttendance = await Attendance.findOne({
        where: {
          id: attendanceId
        }
      })
      if (!existingAttendance) {
        throw new Error('Not checked In.');
      }
        const updatedAttexistingAttendance = await existingAttendance.update(data);
        return updatedAttexistingAttendance;
    } catch (error) {
        throw new Error('Error while checking out.'); 
    }
}