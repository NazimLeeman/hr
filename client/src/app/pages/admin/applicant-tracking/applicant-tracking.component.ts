import { Component, Input } from '@angular/core';
import { ApiClientService } from '../../../services/apiClient/api-client.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

interface Application {
  id: number;
  jobId: number;
  applicantId: number;
  restaurantId: number;
  createdAt: string;
  updatedAt: string;
  status: string
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
    imageUrl: string;
    address: string;
    skillTags: string[];
    hourlyRate: number;
    createdAt: string;
    updatedAt: string;
  };
}

@Component({
  selector: 'app-applicant-tracking',
  templateUrl: './applicant-tracking.component.html',
  styleUrl: './applicant-tracking.component.css'
})
export class ApplicantTrackingComponent {
  listOfData: Application[] = [];
  pastData: Application[] = [];
  apiData: any[] = [];
  isVisible = false;
  isVisibleExperience = false;
  isVisibleDate = false;
 isOkLoading = false;
 selectedApplicantId = 0;
 selectedApplicantData = {};
  selectedApplicantExperience: any[] = [];
  selectedJobApplicantId = 0;
  private statusUpdateSubject = new Subject<string>();
  pastHistory = false;
 @Input() signInRoute: string = '/admin/position';
 pageSize: number = 6;
 currentPage: number = 1; 
 date = null;

  constructor(private router: Router, private apiClientService: ApiClientService, private modalService: NzModalService) {}

  ngOnInit(): void {
    this.loadApplicantsData();
    this.apiClientService.getUpdateObservable().pipe(takeUntil(this.destroy$)).subscribe(() => {
      console.log('Received update. Reacting...');
      this.loadApplicantsData();
    });
  }

  loadApplicantsData(): void {
    this.apiClientService.getAppliedApplicant().subscribe(
      (data: any) => {
          this.apiData = data.applicants[0].applicant.experience;

        this.listOfData = data.applicants.filter((applicant: Application) => 
        applicant.status === 'Pending'
      );
        this.pastData = data.applicants.filter((applicant: Application) => 
        applicant.status === 'Success'
      );
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  formatExperience(experience: string[]): string {
    if (!experience || experience.length === 0) {
      return 'No experience available';
    }
  
    const formattedExperiences = experience.map((exp) => {
      const dateRange = this.formatDateRange(exp);
      return `${exp.split('-')[0].trim()} ${dateRange}`;
    });
  
    return formattedExperiences.join(', ');
  }
  
  formatDateRange(dateRange: string): string {
    const dateParts = dateRange.split(',');
    const startDate = new Date(dateParts[0]);
    const endDate = new Date(dateParts[1]);
  
    const formattedStartDate = this.formatDate(startDate);
    const formattedEndDate = this.formatDate(endDate);
  
    return `From ${formattedStartDate} to ${formattedEndDate}`;
  }
  
  formatDate(date: Date): string {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
  
    return `${month} ${day} ${year}`;
  }

  formatSkills(skillsStringArray: string[]): string[] {
    const skillsString = skillsStringArray[0];
    const skillsArray = skillsString.split(',');
  
    return skillsArray;
  }

  showModal(applicantData: any, applicantId: number, data:any): void {
    this.isVisible = true;
    this.selectedApplicantId = applicantId;
    this.selectedApplicantData = applicantData;
    this.selectedJobApplicantId = data.id;
    console.log(this.selectedJobApplicantId)
  }
  
  showModalDate(applicantData: any, applicantId: number, data:any): void {
    this.isVisibleDate = true;
    this.selectedApplicantId = applicantId;
    this.selectedApplicantData = applicantData;
    this.selectedJobApplicantId = data.id;
  }

  handleOk(): void {
  const applicantId = this.selectedApplicantId;
  
  this.apiClientService.postApplicantToEmployee(this.selectedApplicantData, applicantId).subscribe(
    (response) => {
      console.log('Applicant Hired successfully:', response);
      const employeeId = response.id;

      this.apiClientService.updateJobApplicantData(this.selectedJobApplicantId, { status: 'Success' }).subscribe(
        () => {
          console.log('Job Applicant Data updated successfully.');
          // this.statusUpdateSubject.next('Success');
          // this.apiClientService.triggerUpdate();
          // console.log('triggerUpdate executed');
          this.router.navigate([this.signInRoute + '/' + employeeId]);
          this.modalService.success({
            nzTitle: 'Success',
            nzContent: 'Applicant Hired successfully.',
          });
        },
        (updateError) => {
          console.error('Error updating job applicant data:', updateError);
          this.modalService.error({
            nzTitle: 'Error',
            nzContent: 'Error updating job applicant data. Please try again.',
          });
        }
      );
    },
    (hireError) => {
      console.error('Error hiring applicant:', hireError);
      this.modalService.error({
        nzTitle: 'Error',
        nzContent: 'Error hiring applicant. Please try again.',
      });
    }
  );
}

handleDate(): void {
  this.isVisibleDate = false;
}

  
  handleCancel(): void {
    this.isVisible = false;
    this.isVisibleExperience = false;
    this.isVisibleDate = false;
  }

  showModalExp(applicantId: number, experience: string[]): void {
    this.selectedApplicantId = applicantId;
    this.selectedApplicantExperience = experience;
    this.isVisibleExperience = true;
    console.log(this.selectedApplicantId)
    console.log(this.selectedApplicantExperience)
  }

  close() {
    this.isVisibleExperience = false;
  }

  // getStatusUpdateObservable() {
  //   return this.statusUpdateSubject.asObservable();
  // }

  showPastHistory() {
    this.pastHistory = true;
  }
  
  showCurrentHistory() {
    this.pastHistory = false;
  }

  handlePageIndexChange(pageIndex: number): void {
    this.currentPage = pageIndex;
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private destroy$ = new Subject<void>();

}
