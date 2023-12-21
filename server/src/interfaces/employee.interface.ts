export interface IEmployee {
    id: number,
    restaurantId: number,
    name: string,
    email: string,
    experience: string,
    phoneNumber: number,
    // joiningDate: Date,
    address: string,
    skillTags: string,
    hourlyRate: number,
    positionId?: number,
    applicantId?: number,
    // scheduleId?: number,
    attendanceId?: number,
    payrollId?: number
}