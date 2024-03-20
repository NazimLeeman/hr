export interface IAttendance {
    id: number,
    employeeId: number,
    isCheckedIn?: boolean,
    restaurantId?: number
}