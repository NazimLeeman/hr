interface AccumulatedPrepTimeByDayAndShift {
    [key: string]: number;
  }
  
  function predict(totalEmployees: number, totalOrderPreparationTime: number): string {
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
  
  // Example usage
  const totalEmployees = 6;
  const accumulatedPrepTimeByDayAndShift = {
    'Wednesday - Day Shift': 2200,
    // Add more entries for other days and shifts as needed
    'Thursday - Night Shift': 50,
    // ...
  };
  
  const totalOrderPreparationTime = accumulatedPrepTimeByDayAndShift['Wednesday - Day Shift'] || 0;
  console.log('Result:', predict(totalEmployees, totalOrderPreparationTime));
  