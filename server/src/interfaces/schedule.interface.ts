export interface ISchedule {
    id: number,
    employeeId?: number,
    day: string,
    slotStart: string,
    slotEnds: string,
    restaurantId?: number,
}