export interface IEmployeeSchedule {
    id: number,
    shift?: string,
    employeeId: number,
    scheduleId: number,
    restaurantId?: number,
}