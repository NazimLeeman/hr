export interface ISchedule {
    id: number,
    employeeId: number,
    day: string,
    slotStart: number,
    slotEnds: number,
    restaurantId?: number,
}