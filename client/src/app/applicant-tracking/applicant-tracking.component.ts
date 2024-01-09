import { Component } from '@angular/core';

interface Application {
  key: string;
  restaurantName: string;
  restaurantType: string;
  jobNature: string;
  hourlyRate: number;
  interviewDate: Date;
  status: string;
}
@Component({
  selector: 'app-applicant-tracking',
  templateUrl: './applicant-tracking.component.html',
  styleUrl: './applicant-tracking.component.css'
})
export class ApplicantTrackingComponent {
  listOfData: Application[] = [
    {
      key: '1',
      restaurantName: 'Cafe XYZ',
      restaurantType: 'Cafe',
      jobNature: 'Part Time',
      hourlyRate: 15,
      interviewDate: new Date('2024-01-15T10:30:00'),
      status: 'Pending',
    },
    {
      key: '2',
      restaurantName: 'Pizza Palace',
      restaurantType: 'Fast Food',
      jobNature: 'Full Time',
      hourlyRate: 20,
      interviewDate: new Date('2024-02-01T14:00:00'),
      status: 'Passed',
    },
    {
      key: '3',
      restaurantName: 'Fine Dining Grill',
      restaurantType: 'Fine Dining',
      jobNature: 'Full Time',
      hourlyRate: 25,
      interviewDate: new Date('2024-02-10T12:45:00'),
      status: 'Failed',
    },
  ];
}
