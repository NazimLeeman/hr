import Employee from "./employee.model";

export async function findAllEmployeeInRestaurant (id: number) {
  try {
    const employee = await Employee.findAll({
      where: {
        restaurantId: id
      }
    });

    return employee;
  } catch (error) {
    throw new Error('Error finding employee in restaurant.');
  }
}


export async function addEmployeeToRestaurant (restaurantId: number, data: { 
    name: string, 
    email: string,
    phoneNumber: number,
    joiningDate: Date,
    address: string,
    positionId: number,
    applicantId: number }) {
  try {
    const newEmployee = await Employee.create({ ...data, restaurantId });
    return newEmployee;
  } catch (error) {
    throw new Error('Error adding employee to restaurant.');
  }
}

