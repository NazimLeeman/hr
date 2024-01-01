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
    // phoneNumber: FormControl<string>,
    address: FormControl<string>;
    // experience: FormControl<string>;
    // skillTags: FormControl<string>;
    // hourlyRate: FormControl<string>;
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
          this.password = data.data.password;
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
          this.firstName = data.data.name;
          this.hourlyRate = data.data.hourlyRate;
          this.address = data.data.address;
          this.phoneNumber = data.data.phoneNumber
      },
      (error) => {
          console.error('Error fetching data from the API', error);
      }
  );
}

  submitForm(): void {
    if (this.validateForm.valid) {
      const userData = this.validateForm.value;
      this.apiClientService.registerUser(userData).subscribe((response) => {
        console.log('Applicant registered successfully:', response);
        this.router.navigate(['/summary']);
      },
      (error) => {
        console.log("Error during resgistration", error)
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
      // phoneNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
      // experience: ['', [Validators.required]],
      // skillTags: ['', [Validators.required]],
      // hourlyRate: ['', [Validators.required]],
    })
  }

}
