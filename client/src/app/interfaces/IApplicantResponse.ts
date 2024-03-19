export interface Applicant {
  id: number;
  jobId: number;
  applicantId: number;
  restaurantId: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  job: {
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
  };
  applicant: {
    id: number;
    name: string;
    email: string;
    experience: string[];
    phoneNumber: number;
    address: string;
    skillTags: string[];
    hourlyRate: number;
    imageUrl: string;
    availability: string[];
    createdAt: string;
    updatedAt: string;
  };
}

export interface ApplicantResponse {
  applicants: Applicant[];
}
