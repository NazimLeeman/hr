import { Component } from '@angular/core';
import { FormGroup, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiClientService } from '../api-client.service';
import { switchMap } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrl: './availability.component.css'
})
export class AvailabilityComponent {
  isLoading: boolean = false;
  visible = false;
  radioValue = 'A';
  applicantId = 0;
  availability: string[] = [];
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  validateForm: FormGroup<{
    Monday: FormControl<string>;
    Tuesday: FormControl<string>;
    Wednesday: FormControl<string>;
    Thursday: FormControl<string>;
    Friday: FormControl<string>;
    Saturday: FormControl<string>;
    Sunday: FormControl<string>;
  }>

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params) => {
          this.applicantId = params['applicantId'];
          return this.apiClientService.getApplicantData(this.applicantId);
      })
  ).subscribe(
      (data: any) => {
        console.log('API Response:', data);
      this.availability = data.data.availability;
      },
      (error) => {
          console.error('Error fetching data from the API', error);
      }
    );
  }

  constructor(private fb: NonNullableFormBuilder,private route: ActivatedRoute, private apiClientService: ApiClientService, private router: Router, private modalService: NzModalService) {
    this.validateForm = this.fb.group({
      Monday: ['', [Validators.required]],
      Tuesday: ['', [Validators.required]],
      Wednesday: ['', [Validators.required]],
      Thursday: ['', [Validators.required]],
      Friday: ['', [Validators.required]],
      Saturday: ['', [Validators.required]],
      Sunday: ['', [Validators.required]],
    })
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  submitForm(): void {
    if(this.validateForm.valid) {
      const availabilityArray: string[] = Object.values(this.validateForm.value);

      const updatedData = {
        availability: availabilityArray,
        // other properties from validateForm if needed
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

  generateAvailabilityStructure(): any[] {
    return this.days.map((day, index) => ({
      day,
      availability: this.availability[index] === 'A' ? 'Available' : 'Unavailable'
    }));
  }
}
