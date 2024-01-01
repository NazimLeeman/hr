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

@Component({
  selector: 'app-registration-summary',
  templateUrl: './registration-summary.component.html',
  styleUrl: './registration-summary.component.css'
})
export class RegistrationSummaryComponent implements OnInit {

  applicantId: number = 0; // Assuming applicantId is a string, update accordingly
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';

  validateForm: FormGroup<{
    phoneNumber: FormControl<string>,
    address: FormControl<string>;
    experience: FormControl<string>;
    skillTags: FormControl<string>;
    hourlyRate: FormControl<string>;
  }>

  ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.applicantId = params['applicantId']

        this.apiClientService.getRegisterData(this.applicantId).subscribe((data: any) => {
          // Update component properties with received data
          this.firstName = data.firstName;
          this.lastName = data.lastName;
          this.email = data.email;
          this.password = data.password;
      })
  })
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
      phoneNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
      experience: ['', [Validators.required]],
      skillTags: ['', [Validators.required]],
      hourlyRate: ['', [Validators.required]],
    })
  }

}
