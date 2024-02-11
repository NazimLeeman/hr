import { Component } from '@angular/core';
import { ApiClientService } from '../../../services/apiClient/api-client.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Application } from '../../../interfaces/Application.interface';


@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css'
})
export class ApplicationsComponent {

  listOfData: Application[] = [];
  listOfSuccess: Application[] = [];
  applicantId = 0;
  showSuccess = false;
  pageSize: number = 6;
  currentPage: number = 1;
  successHeaders: string[] = ['Restaurant Name', 'Job Role', 'Job Nature', 'Hourly Rate', 'Status'];
  pendingHeaders: string[] = ['Restaurant Name', 'Job Role', 'Job Nature', 'Hourly Rate', 'Status', 'Action'];


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
    this.apiClientService.getAppliedApplications(this.applicantId).subscribe(
      (data: any) => {
        console.log('API Response:', data);
        this.listOfData = data.applicants.filter((applicant: Application) => 
        applicant.applicantId === applicantId && applicant.status === 'Pending'
        );
        this.listOfSuccess = data.applicants.filter((applicant: Application) =>
          applicant.applicantId === applicantId && applicant.status === 'Success'
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

  handlePageIndexChange(page: number): void {
    this.currentPage = page;
  }

  toggleApplications(boolean: boolean) {
    this.showSuccess = boolean
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private destroy$ = new Subject<void>();
}
