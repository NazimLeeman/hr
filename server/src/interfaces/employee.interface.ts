export interface IEmployee {
    id: number,
    restaurantId: number,
    name: string,
    email: string,
    experience?: [string],
    phoneNumber?: number,
    address?: string,
    skillTags?: [string],
    hourlyRate?: number,
    efficiency?: string,
    imageUrl?: string,
    positionId?: number,
    applicantId?: number,
    attendanceId?: number,
    payrollId?: number
}

export interface IEmployeeLogin {
    name?: string,
    email: string;
    password: string;
}