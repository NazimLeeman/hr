// interface AccumulatedPrepTimeByDayAndShift {
//     [key: string]: number;
//   }
  
//   function predict(totalEmployees: number, totalOrderPreparationTime: number): string {
//       console.log('Total Employees:', totalEmployees);
//       console.log('Total Order Preparation Time:', totalOrderPreparationTime);
  
//       const compareTime = (totalEmployees * 360) - totalOrderPreparationTime;
//       console.log('Compare Time:', compareTime);
  
//       if (compareTime >= 0) {
//           return 'No employees needed currently';
//       } else {
//           const employeesNeeded = Math.ceil(-compareTime / 60);
//           return `${employeesNeeded} employee${employeesNeeded === 1 ? '' : 's'} needed`;
//       }
//   }
  
//   // Example usage
//   const totalEmployees = 6;
//   const accumulatedPrepTimeByDayAndShift = {
//     'Wednesday - Day Shift': 2200,
//     // Add more entries for other days and shifts as needed
//     'Thursday - Night Shift': 50,
//     // ...
//   };
  
//   const totalOrderPreparationTime = accumulatedPrepTimeByDayAndShift['Wednesday - Day Shift'] || 0;
//   console.log('Result:', predict(totalEmployees, totalOrderPreparationTime));
  
// //   ---------------------------

// export function getDayAndShift(unixTimestamp:any) {
//     const date = new Date(unixTimestamp);
//     const hours = date.getHours();
  
//     let shift = 'Day Shift';
  
//     if (hours >= 20 || hours < 8) {
//       shift = 'Night Shift';
//     }
  
//     const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
//     const dayIndex = date.getDay();
  
//     return { dayOfWeek: daysOfWeek[dayIndex], shift };
//   }
  
  
// export function groupOrdersByDayAndShift(orders:any) {
//     const ordersByDayAndShift:any = {};
  
//     orders.forEach((order:any) => {
//       const { dayOfWeek, shift } = getDayAndShift(order.Datetime);
//       const key = `${dayOfWeek} - ${shift}`;
  
//       if (!ordersByDayAndShift[key]) {
//         ordersByDayAndShift[key] = [];
//       }
//       ordersByDayAndShift[key].push(order);
//     });
  
//     const accumulatedPrepTimeByDayAndShift:any = {};
  
//     for (const key in ordersByDayAndShift) {
//       const ordersOnDayAndShift = ordersByDayAndShift[key];
//       const totalPrepTime = ordersOnDayAndShift.reduce((acc:any, order:any) => acc + order.PreparationTime, 0);
//       accumulatedPrepTimeByDayAndShift[key] = totalPrepTime;
//     }
  
//     return accumulatedPrepTimeByDayAndShift;
//   }

//  export const sampleOrders = [{
//     Datetime: 1705508684181,
//       OrderId: 116,
//       PreparationTime: 47
//   }]

//   const ordersByDay = groupOrdersByDayAndShift(sampleOrders);
// console.log(ordersByDay);

