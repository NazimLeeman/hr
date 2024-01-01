export interface IApplicant {
  id: number,
  name: string,
  email: string,
  experience?: string,
  phoneNumber?: number,
  address?: string,
  skillTags?: string,
  hourlyRate?: number,
  restaurantId?: number,
  positionId?: number,
  applicantId?: number
}