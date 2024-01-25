import PerformanceKds from "./performance.model";

export async function createEmployeeEfficiency(data: {
  employeeId: number, orderId: string, servedOnTime: boolean 
}) {
  try {
    const access = await PerformanceKds.create(data);
    return access;
  } catch (error) {
    console.log(error)
    throw new Error('Error while creating employee efficiency in database.');
  }
}