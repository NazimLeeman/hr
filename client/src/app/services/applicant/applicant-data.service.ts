import { Injectable } from '@angular/core';
import { UserResponse } from '../../interfaces/IUserResponse.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicantDataService {

  constructor() { }

  applicantData!: UserResponse;
  newApplicantDataEvent = new Subject<UserResponse>();

  setNewApplicantData (applicantData: UserResponse) {
    this.applicantData = applicantData;
    this.newApplicantDataEvent.next(applicantData);
  }
}
