import Schedule from "./schedule.model";

export async function createSchedule(
  restaurantId: number,
  data: {
    day: string;
    slotStart: string;
    slotEnds: string;
    shift: string;
    employees: [string];
  }
) {
  try {
    const newSchedule = await Schedule.create({ ...data, restaurantId });
    return newSchedule;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating schedule for employee.");
  }
}

export async function updateScheduleForEmployee(
  employeeId: number,
  scheduleId: number,
  data: {
    day?: string;
    slotStart?: string;
    slotEnds?: string;
  }
) {
  try {
    let existingSchedule = await Schedule.findOne({
      where: {
        id: scheduleId,
      },
    });
    if (!existingSchedule) {
      throw new Error("Schedule not found.");
    }
    const updatedSchedule = await existingSchedule.update(data);
    return updatedSchedule;
  } catch (error) {
    throw new Error("Error updating schedule for employee.");
  }
}

export async function deleteSchedule(scheduleId: number) {
  try {
    const existingSchedule = await Schedule.findByPk(scheduleId);

    if (!existingSchedule) {
      throw new Error("Schedule not found.");
    }
    await existingSchedule.destroy();
    console.log("Schedule deleted successfully.");
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting schedule.");
  }
}

export async function findAllScheduleInRestaurant(id: number) {
  try {
    const schedule = await Schedule.findAll({
      where: {
        restaurantId: id,
      },
    });
    return schedule;
  } catch (error) {
    throw new Error("Error finding schedule in restaurant.");
  }
}

export async function findAllScheduleOfEmployee(
  employeeId: number,
  restaurantId: number
) {
  try {
    const employeeSchedule = await Schedule.findAll({
      where: {
        employeeId: employeeId,
        restaurantId: restaurantId,
      },
    });
    return employeeSchedule;
  } catch (error) {
    throw new Error("Error finding schedule of employee.");
  }
}
