import { Component } from '@angular/core';
import { ApiClientService } from '../api-client.service';

interface Application {
  name: string;
  skillTags: string[];
  experience: string[];
  hourlyRate: number;
}

interface Applicant {
  id: number;
  name: string;
  email: string;
  experience: string[];
  phoneNumber: number;
  address: string;
  skillTags: string[];
  hourlyRate: number;
  createdAt: string;
  updatedAt: string;
  jobs: Job[];
}

interface Job {
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
  jobApplicant: JobApplicant;
}

interface JobApplicant {
  id: number;
  jobId: number;
  applicantId: number;
  restaurantId: number;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-applicant-tracking',
  templateUrl: './applicant-tracking.component.html',
  styleUrl: './applicant-tracking.component.css'
})
export class ApplicantTrackingComponent {
  listOfData: Application[] = [];

  constructor(private apiClientService: ApiClientService) {}

  ngOnInit(): void {
    this.loadApplicantsData();
  }

  loadApplicantsData(): void {
    this.apiClientService.getAppliedApplicant().subscribe(
      (data: { applicants: Applicant[] }) => {
        console.log('API Response:', data);

        const restaurantId = 1;

        this.listOfData = data.applicants
          .filter(applicant => applicant.jobs.some(job => job.restaurantId === restaurantId))
          .map(({ name, skillTags, experience, hourlyRate, jobs }) => ({ name, skillTags, experience, hourlyRate, jobs }));
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
