import { Component, Input } from '@angular/core';
import { ApiClientService } from '../api-client.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';

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
  apiData: any[] = [];
  isVisible = false;
  isVisibleExperience = false;
 isOkLoading = false;
 selectedApplicantId = 0;
 selectedApplicantData = {};
  selectedApplicantExperience: any[] = [];
  selectedJobApplicantId = 0;
 @Input() signInRoute: string = '/admin/position';

  constructor(private router: Router, private apiClientService: ApiClientService, private modalService: NzModalService) {}

  ngOnInit(): void {
    this.loadApplicantsData();
  }

  loadApplicantsData(): void {
    this.apiClientService.getAppliedApplicant().subscribe(
      (data: any) => {
          this.apiData = data.applicants[0].applicant.experience;
        console.log('API Response:', data, this.apiData);

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

  showModal(applicantData: any, applicantId: number, data:any): void {
    this.isVisible = true;
    this.selectedApplicantId = applicantId;
    this.selectedApplicantData = applicantData;
    this.selectedJobApplicantId = data.id;
    console.log(this.selectedJobApplicantId)
  }

  // handleOk(): void {
  //   const applicantId = this.selectedApplicantId;
  //   console.log(this.selectedApplicantData, applicantId)
  //   this.apiClientService.postApplicantToEmployee(this.selectedApplicantData, applicantId ).subscribe(
  //     (response) => {
  //       console.log('Applicant Hired successfully:', response);
  //       const employeeId = response.id
  //       this.router.navigate([this.signInRoute +  '/' +  employeeId]);
  //       this.modalService.success({
  //         nzTitle: 'Success',
  //         nzContent: 'Applicant Hired successfully.',
  //       });
  //     },
  //     (error) => {
  //       console.error('Error hiring applicant:', error);
  //       this.modalService.error({
  //         nzTitle: 'Error',
  //         nzContent: 'Error hiring applicant. Please try again.',
  //       });
  //     }
  //   );
  
  
  //   this.isOkLoading = true;
  //   setTimeout(() => {
  //     this.isVisible = false;
  //     this.isOkLoading = false;
  //   }, 3000);
  // }

  handleOk(): void {
  const applicantId = this.selectedApplicantId;
  
  // First API call to hire the applicant
  this.apiClientService.postApplicantToEmployee(this.selectedApplicantData, applicantId).subscribe(
    (response) => {
      console.log('Applicant Hired successfully:', response);
      const employeeId = response.id;

      // Second API call to update job applicant data
      this.apiClientService.updateJobApplicantData(this.selectedJobApplicantId, { status: 'success' }).subscribe(
        () => {
          console.log('Job Applicant Data updated successfully.');
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

  
  handleCancel(): void {
    this.isVisible = false;
    this.isVisibleExperience = false;
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

}
