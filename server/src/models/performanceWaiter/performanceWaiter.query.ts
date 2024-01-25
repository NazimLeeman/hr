import PerformanceWaiter from "./performanceWaiter.model";

export async function createWaiterEfficiency(data: {
    employeeId: number,
    orderId: string,
    date: number;   
    preparationTime: number; 
    orderReadyToServeTime: number; 
    bill: number;   
    occupiedToCompleteTime: number;  
    restaurantId: number;  
}) {
  try {
    const access = await PerformanceWaiter.create(data);
    return access;
  } catch (error) {
    console.log(error)
    throw new Error('Error while creating waiter efficiency in database.');
  }
}