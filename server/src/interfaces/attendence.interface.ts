export interface IAttendance {
    id: number,
    employeeId: number,
    // day: string,
    // checkInTime?: number,
    // checkOutTime?: number,
    isCheckedIn?: boolean,
    restaurantId?: number
}