import { Component, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ApiClientService } from '../api-client.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css'
})
export class JobCardComponent {
 @Input() card: any;
 @Input() isSliced: boolean = true;
 @Input() showButton: boolean = true;
 isVisible = false;
 isOkLoading = false;
 selectedJobId = 0;
 selectedRestaurantId = 0;
 applicantId = 0;

 toggleCardDetails(card: any): void {
  card.showDetails = !card.showDetails;
}

showModal(jobId: number, restaurantId: number): void {
  this.isVisible = true;
  this.selectedJobId = jobId;
  this.selectedRestaurantId = restaurantId;
}

ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.applicantId = +params['applicantId'] || 0;
  });
}

handleOk(): void {
  const applicantId = this.applicantId;
  console.log(this.selectedJobId, applicantId)
  this.apiClientService.applyJob(this.selectedJobId, this.selectedRestaurantId, applicantId ).subscribe(
    (response) => {
      console.log('Application submitted successfully:', response);
      this.modalService.success({
        nzTitle: 'Success',
        nzContent: 'Application submitted successfully.',
      });
    },
    (error) => {
      console.error('Error submitting application:', error);
      this.modalService.error({
        nzTitle: 'Error',
        nzContent: 'Error submitting application. Please try again.',
      });
    }
  );


  this.isOkLoading = true;
  setTimeout(() => {
    this.isVisible = false;
    this.isOkLoading = false;
  }, 3000);
}

handleCancel(): void {
  this.isVisible = false;
}

formatSkills(skillsStringArray: string[]): string[] {
  // const skillsString = skillsStringArray[0];
  const skillsArray = skillsStringArray.flatMap(skillString => skillString.split(','));
  console.log(skillsArray)
  return skillsArray;
}

constructor(private route: ActivatedRoute, private apiClientService: ApiClientService,private modalService: NzModalService) {}
 
}
