import { Component } from '@angular/core';
import { ApiClientService } from '../api-client.service';
import { NzModalService } from 'ng-zorro-antd/modal';

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
  selector: 'app-applicant-tracking',
  templateUrl: './applicant-tracking.component.html',
  styleUrl: './applicant-tracking.component.css'
})
export class ApplicantTrackingComponent {
  listOfData: Application[] = [];
  isVisible = false;
 isOkLoading = false;
 selectedApplicantId = 0;
 selectedApplicantData = {};

  constructor(private apiClientService: ApiClientService, private modalService: NzModalService) {}

  ngOnInit(): void {
    this.loadApplicantsData();
  }

  loadApplicantsData(): void {
    this.apiClientService.getAppliedApplicant().subscribe(
      (data: any) => {
        console.log('API Response:', data);

        const restaurantId = 1;

        this.listOfData = data.applicants.filter((applicant: Application) => 
        applicant.restaurantId === restaurantId
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

  showModal(applicantData: any, applicantId: number): void {
    this.isVisible = true;
    this.selectedApplicantId = applicantId;
    this.selectedApplicantData = applicantData;
  }

  handleOk(): void {
    const applicantId = this.selectedApplicantId;
    console.log(this.selectedApplicantData, applicantId)
    // this.apiClientService.applyJob(this.selectedJobId, this.selectedRestaurantId, applicantId ).subscribe(
    //   (response) => {
    //     console.log('Application submitted successfully:', response);
    //     this.modalService.success({
    //       nzTitle: 'Success',
    //       nzContent: 'Application submitted successfully.',
    //     });
    //   },
    //   (error) => {
    //     console.error('Error submitting application:', error);
    //     this.modalService.error({
    //       nzTitle: 'Error',
    //       nzContent: 'Error submitting application. Please try again.',
    //     });
    //   }
    // );
  
  
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }
  
  handleCancel(): void {
    this.isVisible = false;
  }

}
