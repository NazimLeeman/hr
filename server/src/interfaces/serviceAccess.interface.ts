export interface IServiceAccess {
    id: number,
    userId: number,
    employeeId?: number,
    // restaurantId: number,
    position: string,
    services: string[]
}