import Employee from "../employee/employee.model";
import Schedule from "./schedule.model";


export async function createScheduleForEmployee (employeeId: number, restaurantId: number, data: { 
    day: string,
    slotStart: number,
    slotEnds: number,
 }) {
  try {
    let employee = await Employee.findOne({
      where: {
        id: employeeId
      }
    })
    if (!employee) {
      throw new Error('Employee not found.');
    }
    const newSchedule = await Schedule.create({ ...data, employeeId, restaurantId });
    return newSchedule;
  } catch (error) {
    throw new Error('Error creating schedule for employee.');
  }
}

export async function updateScheduleForEmployee(employeeId: number, scheduleId: number, data: {
    day?: string,
    slotStart?: number,
    slotEnds?: number,
}) {
    try {
      let existingSchedule = await Schedule.findOne({
        where: {
          id: scheduleId
        }
      })
      if (!existingSchedule) {
        throw new Error('Schedule not found.');
      }
        const updatedSchedule = await existingSchedule.update(data);
        return updatedSchedule;
    } catch (error) {
        throw new Error('Error updating schedule for employee.');
    }
}

export async function deleteSchedule(scheduleId: number) {
    try {
        const existingSchedule = await Schedule.findByPk(scheduleId);

        if (!existingSchedule) {
            throw new Error('Schedule not found.');
        }
        await existingSchedule.destroy();
        console.log('Schedule deleted successfully.');
    } catch (error) {
        console.log(error);
        throw new Error('Error deleting schedule.');
    }
}

export async function findAllScheduleInRestaurant (id: number) {
    try {
      const schedule = await Schedule.findAll({
        where: {
          restaurantId: id
        }
      });
      return schedule;
    } catch (error) {
      throw new Error('Error finding schedule in restaurant.');
    }
  }

  export async function findScheduleOfEmployee (id: number) {
    try {
      const employeeSchedule = await Schedule.findAll({
        where: {
          employeeId: id
        }
      });
      return employeeSchedule;
    } catch (error) {
      throw new Error('Error finding schedule of employee.');
    }
  }