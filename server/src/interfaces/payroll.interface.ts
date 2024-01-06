export interface IPayroll {
    id: number,
    employeeId: number,
    hourlyRate: number,
    totalHours: number,
    totalDeduction: number,
    restaurantId: number
}