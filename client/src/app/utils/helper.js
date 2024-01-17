export function getDayAndShift(unixTimestamp) {
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
  
  
export function groupOrdersByDayAndShift(orders) {
    const ordersByDayAndShift = {};
  
    orders.forEach(order => {
      const { dayOfWeek, shift } = getDayAndShift(order.Datetime);
      const key = `${dayOfWeek} - ${shift}`;
  
      if (!ordersByDayAndShift[key]) {
        ordersByDayAndShift[key] = [];
      }
      ordersByDayAndShift[key].push(order);
    });
  
    const accumulatedPrepTimeByDayAndShift = {};
  
    for (const key in ordersByDayAndShift) {
      const ordersOnDayAndShift = ordersByDayAndShift[key];
      const totalPrepTime = ordersOnDayAndShift.reduce((acc, order) => acc + order.PreparationTime, 0);
      accumulatedPrepTimeByDayAndShift[key] = totalPrepTime;
    }
  
    return accumulatedPrepTimeByDayAndShift;
  }

 export const sampleOrders = [{
    Datetime: 1705508684181,
      OrderId: 116,
      PreparationTime: 47
  }]

  const ordersByDay = groupOrdersByDayAndShift(sampleOrders);
console.log(ordersByDay);