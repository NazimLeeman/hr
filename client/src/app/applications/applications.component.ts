import { Component } from '@angular/core';
import { ApiClientService } from '../api-client.service';
import { ActivatedRoute } from '@angular/router';

interface Application {
  id: number;
  jobId: number;
  applicantId: number;
  restaurantId: number;
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
    createdAt: string;
    updatedAt: string;
  };
}
@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css'
})
export class ApplicationsComponent {

  listOfData: Application[] = [];

  constructor(private apiClientService: ApiClientService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const applicantId = Number(params['applicantId']);
      this.loadApplicantsData(applicantId);
    });
  }

  loadApplicantsData(applicantId: number): void {
    this.apiClientService.getAppliedApplicant().subscribe(
      (data: any) => {
        console.log('API Response:', data);

        // const applicantId = 1;

        this.listOfData = data.applicants.filter((applicant: Application) => 
        applicant.applicantId === applicantId
      );
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
