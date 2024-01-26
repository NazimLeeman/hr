import { Component } from '@angular/core';
import { ApiClientService } from '../api-client.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

interface Application {
  id: number;
  jobId: number;
  applicantId: number;
  restaurantId: number;
  createdAt: string;
  updatedAt: string;
  status: string;
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
  applicantId = 0;

  constructor(private apiClientService: ApiClientService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.applicantId = Number(params['applicantId']);
      this.loadApplicantsData(this.applicantId);
    });
    this.apiClientService.getUpdateObservable().pipe(takeUntil(this.destroy$)).subscribe(() => {
      console.log('Received update. Reacting...');
      this.loadApplicantsData(this.applicantId);
    });
  }

  loadApplicantsData(applicantId?: number): void {
    this.apiClientService.getAppliedApplicant().subscribe(
      (data: any) => {
        console.log('API Response:', data);
        this.listOfData = data.applicants.filter((applicant: Application) => 
        applicant.applicantId === applicantId
      );
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  getColorForStatus(status: string): string {
    return status === 'Success' || 'success' ? 'green' : 'gold';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private destroy$ = new Subject<void>();
}
