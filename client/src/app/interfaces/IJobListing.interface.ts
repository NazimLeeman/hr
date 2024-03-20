export interface JobListing {
  id: number;
  jobRole: string;
  jobNature: string;
  jobDescription: string;
  experience: string;
  skillTags: string[];
  hourlyRate: number;
  applicationDeadline: string;
  responsibilities: string[];
  restaurantId: number;
  createdAt: string;
  updatedAt: string;
}

export interface JobListingsResponse {
  data: JobListing[];
}
