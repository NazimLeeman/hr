import { Injectable } from '@angular/core';

interface AccumulatedPrepTimeByDayAndShift {
  [key: string]: number;
}

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  predict(totalEmployees: number, totalOrderPreparationTime: number): string {
    console.log('Total Employees:', totalEmployees);
    console.log('Total Order Preparation Time:', totalOrderPreparationTime);

    const compareTime = (totalEmployees * 360) - totalOrderPreparationTime;
    console.log('Compare Time:', compareTime);

    if (compareTime >= 0) {
        return 'No employees needed currently';
    } else {
        const employeesNeeded = Math.ceil(-compareTime / 60);
        return `${employeesNeeded} employee${employeesNeeded === 1 ? '' : 's'} needed`;
    }
}

getDayAndShift(unixTimestamp:any) {
  const date = new Date(unixTimestamp);
  const hours = date.getHours();

  let shift = 'Day Shift';

  if (hours >= 20 || hours < 8) {
    shift = 'Night Shift';
  }

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const dayIndex = date.getDay();

  return { dayOfWeek: daysOfWeek[dayIndex], shift };
}

groupOrdersByDayAndShift(orders:any) {
  const ordersByDayAndShift:any = {};

  orders.forEach((order:any) => {
    const { dayOfWeek, shift } = this.getDayAndShift(order.Datetime);
    const key = `${dayOfWeek} - ${shift}`;

    if (!ordersByDayAndShift[key]) {
      ordersByDayAndShift[key] = [];
    }
    ordersByDayAndShift[key].push(order);
  });

  const accumulatedPrepTimeByDayAndShift:any = {};

  for (const key in ordersByDayAndShift) {
    const ordersOnDayAndShift = ordersByDayAndShift[key];
    const totalPrepTime = ordersOnDayAndShift.reduce((acc:any, order:any) => acc + order.PreparationTime, 0);
    accumulatedPrepTimeByDayAndShift[key] = totalPrepTime;
  }

  return accumulatedPrepTimeByDayAndShift;
  }

  sampleOrders = [{
    Datetime: 1705508684181,
      OrderId: 116,
      PreparationTime: 47
  }]

  ordersByDay = this.groupOrdersByDayAndShift(this.sampleOrders);
  
}
