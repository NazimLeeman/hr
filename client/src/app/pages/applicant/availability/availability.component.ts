import { Component } from '@angular/core';
import { FormGroup, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiClientService } from '../../../services/apiClient/api-client.service';
import { switchMap } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserResponse } from '../../../interfaces/IUserResponse.interface';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrl: './availability.component.css'
})
export class AvailabilityComponent {
  isChecked: boolean = false;
  tuesdayChecked: boolean = false;
  wednesdayChecked: boolean = false;
  thursdayChecked: boolean = false;
  fridayChecked: boolean = false;
  saturdayChecked: boolean = false;
  sundayChecked: boolean = false;
  time = new Date();
  isLoading: boolean = false;
  visible = false;
  radioValue = 'A';
  applicantId = 0;
  availability: string[] = [];
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  validateForm: FormGroup;

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params) => {
          this.applicantId = params['applicantId'];
          return this.apiClientService.getApplicantData(this.applicantId);
      })
  ).subscribe(
      (data: UserResponse) => {
      this.availability = data.data.availability.map((item: string) => JSON.parse(item));
      this.days;    
    },
      (error) => {
          console.error('Error fetching data from the API', error);
      }
    );
  }

  constructor(private fb: NonNullableFormBuilder,private route: ActivatedRoute, private apiClientService: ApiClientService, private router: Router, private modalService: NzModalService) {
    this.validateForm = this.fb.group({
    })
    this.days.forEach(day => {
      this.validateForm.addControl(`${day}From`, this.fb.control<[Date] | null>(null));
      this.validateForm.addControl(`${day}To`, this.fb.control<[Date] | null>(null));
    });
  }

  toggleVisibility(isVisible: boolean): void {
    this.visible = isVisible;
}

  submitForm(): void {

    if(this.validateForm.valid) {
      const availabilityArray: any = [];
      this.days.forEach(day => {
        const fromTime = this.validateForm.get(`${day}From`)?.value;
        const toTime = this.validateForm.get(`${day}To`)?.value;
        if (fromTime !== null && toTime !== null) {
          availabilityArray.push({
            day: day,
            from: fromTime,
            to: toTime
          });
        }
      })
      const updatedData = {
        availability: availabilityArray
      };
      
      this.apiClientService.updateApplicantData(this.applicantId, updatedData).subscribe((response) => {
       
        this.modalService.success({
          nzTitle: 'Success',
          nzContent: 'Applicant Availability Updated successfully.',
          nzOnOk: () => {
            location.reload()
          }
        });
      },
      (error) => {
        console.log("Error during update", error)
      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  log(time: Date): void {
    console.log(time && time.toTimeString());
  }

  onCheckboxChange(day: string): void {
    switch (day) {
      case 'Monday':
        this.isChecked = !this.isChecked;
        break;
      case 'Tuesday':
        this.tuesdayChecked = !this.tuesdayChecked;
        break;
      case 'Wednesday':
        this.wednesdayChecked = !this.wednesdayChecked;
        break;
      case 'Thursday':
        this.thursdayChecked = !this.thursdayChecked;
        break;
      case 'Friday':
        this.fridayChecked = !this.fridayChecked;
        break;
      case 'Saturday':
        this.saturdayChecked = !this.saturdayChecked;
        break;
      case 'Sunday':
        this.sundayChecked = !this.sundayChecked;
        break;
      default:
        break;
    }
  }

  formatAvailabilityData(data: any): string {
    const fromDate = new Date(data.from);
    const toDate = new Date(data.to);

    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      return `${data.day} Invalid Date`;
    }
  
    const fromTime = fromDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const toTime = toDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
    return `<strong>${data.day}</strong><br>From ${fromTime} To ${toTime}`;
  }
  
}
