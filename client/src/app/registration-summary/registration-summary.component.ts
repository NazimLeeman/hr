import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { ApiClientService } from '../api-client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-registration-summary',
  templateUrl: './registration-summary.component.html',
  styleUrl: './registration-summary.component.css'
})
export class RegistrationSummaryComponent implements OnInit {

  applicantId: number = 0;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  address: string = '';
  hourlyRate: number = 0;
  phoneNumber: number = +880;
  password: string = '';

  validateForm: FormGroup<{
    phoneNumber: FormControl<number>,
    address: FormControl<string>;
    hourlyRate: FormControl<number>;
  }>

ngOnInit(): void {
  this.route.params.pipe(
      switchMap((params) => {
          this.applicantId = params['applicantId'];
          return this.apiClientService.getRegisterData(this.applicantId);
      })
  ).subscribe(
      (data: any) => {
        console.log('API Response:', data);
          this.email = data.data.email;
          this.password = '********';

          this.additionOnInit();
      },
      (error) => {
          console.error('Error fetching data from the API', error);
      }
  );
}

additionOnInit(): void {
  this.route.params.pipe(
      switchMap((params) => {
          this.applicantId = params['applicantId'];
          return this.apiClientService.getApplicantData(this.applicantId);
      })
  ).subscribe(
      (data: any) => {
        console.log('API Response:', data);
      this.firstName = '';
      this.lastName = '';

      if (data.data.name) {
        const spaceIndex = data.data.name.indexOf(' ');
        if (spaceIndex !== -1) {
          this.firstName = data.data.name.substring(0, spaceIndex);
          this.lastName = data.data.name.substring(spaceIndex + 1);
        } else {
          this.firstName = data.data.name;
        }
      }

      this.hourlyRate = data.data.hourlyRate;
      this.address = data.data.address;
      this.phoneNumber = data.data.phoneNumber;
      },
      (error) => {
          console.error('Error fetching data from the API', error);
      }
  );
}

  submitForm(): void {
    if (this.validateForm.valid) {
      const updatedData = this.validateForm.value;
      this.apiClientService.updateApplicantData(this.applicantId, updatedData).subscribe((response) => {
        console.log('Applicant updated successfully:', response);
        location.reload();
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

  constructor(private fb: NonNullableFormBuilder, private route: ActivatedRoute, private apiClientService: ApiClientService, private router: Router) {
    this.validateForm = this.fb.group({
      phoneNumber: [+880, [Validators.required]],
      address: ['', [Validators.required]],
      hourlyRate: [0, [Validators.required]],
    })
  }

}
