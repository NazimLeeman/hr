import { Component } from '@angular/core';
import { FormGroup, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiClientService } from '../../../services/apiClient/api-client.service';
import { switchMap } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd/modal';

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
  // <{
  //   MondayFrom: FormControl<[Date] | null>;
  //   MondayTo: FormControl<[Date] | null>;
  //   TuesdayFrom: FormControl<[Date] | null>;
  //   TuesdayTo: FormControl<[Date] | null>;
  //   WednesdayFrom: FormControl<[Date] | null>;
  //   WednesdayTo: FormControl<[Date] | null>;
  //   ThursdayFrom: FormControl<[Date] | null>;
  //   ThursdayTo: FormControl<[Date] | null>;
  //   FridayFrom: FormControl<[Date] | null>;
  //   FridayTo: FormControl<[Date] | null>;
  //   SaturdayFrom: FormControl<[Date] | null>;
  //   SaturdayTo: FormControl<[Date] | null>;
  //   SundayFrom: FormControl<[Date] | null>;
  //   SundayTo: FormControl<[Date] | null>;
  // }>

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params) => {
          this.applicantId = params['applicantId'];
          return this.apiClientService.getApplicantData(this.applicantId);
      })
  ).subscribe(
      (data: any) => {
        console.log('API Response:', data);
      this.availability = data.data.availability.map((item: string) => JSON.parse(item));
      this.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']     
      console.log(this.availability)
    },
      (error) => {
          console.error('Error fetching data from the API', error);
      }
    );
  }

  constructor(private fb: NonNullableFormBuilder,private route: ActivatedRoute, private apiClientService: ApiClientService, private router: Router, private modalService: NzModalService) {
    this.validateForm = this.fb.group({
      // MondayFrom: this.fb.control<[Date] | null>(null),
      // MondayTo: this.fb.control<[Date] | null>(null),
      // TuesdayFrom: this.fb.control<[Date] | null>(null),
      // TuesdayTo: this.fb.control<[Date] | null>(null),
      // WednesdayFrom: this.fb.control<[Date] | null>(null),
      // WednesdayTo: this.fb.control<[Date] | null>(null),
      // ThursdayFrom: this.fb.control<[Date] | null>(null),
      // ThursdayTo: this.fb.control<[Date] | null>(null),
      // FridayFrom: this.fb.control<[Date] | null>(null),
      // FridayTo: this.fb.control<[Date] | null>(null),
      // SaturdayFrom: this.fb.control<[Date] | null>(null),
      // SaturdayTo: this.fb.control<[Date] | null>(null),
      // SundayFrom: this.fb.control<[Date] | null>(null),
      // SundayTo: this.fb.control<[Date] | null>(null),
    })
    this.days.forEach(day => {
      this.validateForm.addControl(`${day}From`, this.fb.control<[Date] | null>(null));
      this.validateForm.addControl(`${day}To`, this.fb.control<[Date] | null>(null));
    });
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  submitForm(): void {
    console.log(this.validateForm.value)
    if(this.validateForm.valid) {
      const availabilityArray: any = [];
      // const availabilityArray: any = Object.values(this.validateForm.value);

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
        availability: availabilityArray,
      };
      console.log(' data:', updatedData)
      this.apiClientService.updateApplicantData(this.applicantId, updatedData).subscribe((response) => {
        console.log('Applicant availability updated successfully:', response);
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

  generateAvailabilityStructure(): any[] {
    return this.days.map((day) => ({
      day,
      // availability: this.availability.find((data) => data.day === day)
    }));
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
