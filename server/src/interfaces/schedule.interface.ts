export interface ISchedule {
    id: number,
    employeeId?: number,
    day: string,
    slotStart: Date,
    slotEnds: Date,
    restaurantId?: number,
}