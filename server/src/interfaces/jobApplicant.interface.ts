export interface IJobApplicant {
    id: number,
    jobId: number,
    applicantId: number,
    restaurantId?: number,
    status?: string
}