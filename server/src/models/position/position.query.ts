import { Op } from "sequelize";
import Employee from "../employee/employee.model";
import Position from "./position.model";

// export async function createPositionForEmployee (employeeId: number, restaurantId: number, data: { 
//     position: string, services: string[]
//  }) {
//   try {
//     let employee = await Employee.findOne({
//       where: {
//         id: employeeId,
//         restaurantId: restaurantId
//       }
//     })
//     if (!employee) {
//       throw new Error('Employee not found.');
//     }
//     const newPosition = await Position.create({ ...data, employeeId, restaurantId });
//     return newPosition;
//   } catch (error) {
//     console.log(error)
//     throw new Error('Error creating position for employee.');
//   }
// }

export async function createEmployeeServiceAccess (data: {
  employeeId: number, position: string, services: string[]
}) {
  try {
    const access = await Position.create(data);
    return access;
  } catch (error) {
    console.log(error)
    throw new Error('Error while creating employee service in database.');
  }
}


export async function updateEmployeeServiceAccess(positionId: number, data: {
  employeeId: number, position: string, services: string[]
}) {
  try {
      const existingPositionAccess = await Position.findOne({
          where: {
              id: positionId
          }
      })
      if (!existingPositionAccess) {
          throw new Error ('Service not found')
      }
      const updatedServiceAccess = await existingPositionAccess.update(data);
      return updatedServiceAccess;
  } catch (error) {
      console.log(error);
      throw new Error('Error while updating employee service in database.')
  }
}

export async function findEmployeeServiceAccess(employeeId:number) {
  try {
      const access = await Position.findOne({
          where: {
              employeeId: employeeId
          }
      })
      return access;
  } catch (error) {
      console.log(error);
      throw new Error('Error while getting employee service access from database.')
  }
}

export async function checkEmployeeServiceAccess(employeeId:number, service: string) {
  try {
      const employeeServiceAccess = await Position.findOne({
          where: {
              employeeId: employeeId
          }
      })
      if (employeeServiceAccess) {
          return (employeeServiceAccess.services.includes('all') || employeeServiceAccess.services.includes(service.toUpperCase()));        
      }
      return false;
  } catch (error) {
      console.log(error);
      throw new Error('Error while checking employee service access from database.')
  }
}
export async function getEmployeeServiceAccess(employeeId:number) {
  try {
      const employeeServiceAccess = await Position.findOne({
          where: {
              employeeId: employeeId
          }
      })
      if (employeeServiceAccess) {
          return (employeeServiceAccess.services);        
      }
      return false;
  } catch (error) {
      console.log(error);
      throw new Error('Error while checking employee service access from database.')
  }
}


export async function findAllPositionInRestaurant (id: number) {
  try {
    const position = await Position.findAll({
      where: {
        restaurantId: id
      }
    });
    return position;
  } catch (error) {
    throw new Error('Error finding position in restaurant.');
  }
}

export async function getEmployeeInfo(employeeId: number) {
  try {
    const employeeInfo = await Employee.findOne({
      where: { id: employeeId },
      include: [Position],
    });

    if (employeeInfo) {
      const { positionId, ...employeeInformation } = employeeInfo.toJSON();
      return { positionId, employeeInformation };
    }
    return false;
} catch (error) {
    console.log(error);
    throw new Error('Error while checking employee service access from database.')
}
}

export async function findAllChefsInRestaurant(restaurantId: number) {
  try {
    const chefsInfo = await Position.findAll({
      where: {
        restaurantId: restaurantId,
        position: {
          [Op.iLike]: '%Chef%',
        },
      },
      include: [{
        model: Employee
      }],
    });
    if (chefsInfo && chefsInfo.length > 0) {
      const chefsData = chefsInfo.map(chef => {
        const { id, ...employeeInformation } = chef.toJSON();
        return { id, employeeInformation };
      });
      return chefsData
    }
    return false;
  } catch (error) {
    throw new Error('Error finding position in restaurant.');
  }
}

export async function findAllWaitersInRestaurant(restaurantId: number) {
  try {
    const waiters = await Position.findAll({
      where: {
        restaurantId: restaurantId,
        position: {
          [Op.iLike]: '%Waiter%',
        },
      },
      include: [{
        model: Employee
      }],
    });
    return waiters;
  } catch (error) {
    throw new Error('Error finding position in restaurant.');
  }
}

export async function createOwnerServiceAccess (data: {
  employeeId: number, position: string, services: string[], restaurantId: number
}) {
  try {
    const access = await Position.create(data);
    return access;
  } catch (error) {
    console.log(error)
    throw new Error('Error while creating employee service in database.');
  }
}