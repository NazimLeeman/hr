import Employee from "../employee/employee.model";
import PerformanceKds from "./performance.model";

export async function createEmployeeEfficiency(data: {
  employeeId: number, orderId: string, servedOnTime: boolean 
}) {
  try {
    const creating = await PerformanceKds.create(data);
    if (creating) {
      const access = await PerformanceKds.findAll({
      where: {
        employeeId: data.employeeId
      }
    });
    const servedOnTimeCount = access.filter(item => item.servedOnTime).length;
    
    const totalOrders = access.length;
    const result = Math.round((servedOnTimeCount / totalOrders) * 100);
    const efficiency = result.toString();
    const updateEfficiency = await Employee.update({efficiency: efficiency}, {
      where: {
        id: data.employeeId
      } 
    })
    return updateEfficiency;
    }   
  } catch (error) {
    console.log(error)
    throw new Error('Error while creating employee efficiency in database.');
  }
}

export async function getEmployeeEfficiency(employeeId: number) {
  try {
    const access = await PerformanceKds.findAll({
      where: {
        employeeId: employeeId
      }
    });
    const servedOnTimeCount = access.filter(item => item.servedOnTime).length;
    
    const totalOrders = access.length;
    const result = Math.round((servedOnTimeCount / totalOrders) * 100);
    const efficiency = result.toString();

    // return efficiency;
    const updateEfficiency = await Employee.update({efficiency: efficiency}, {
      where: {
        id: employeeId
      } 
    })
  return updateEfficiency;
  } catch (error) {
    console.log(error)
    throw new Error('Error while creating employee efficiency in database.');
  }
}