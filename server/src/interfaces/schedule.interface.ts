export interface ISchedule {
    id: number,
    employeeId?: number,
    day: string,
    slotStart: string,
    slotEnds: string,
    shift?: string,
    restaurantId?: number,
    employees?: [string],
}