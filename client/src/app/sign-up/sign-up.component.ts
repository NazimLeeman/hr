import { Component} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { ApiClientService } from '../api-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    checkPassword: FormControl<string>;
    name: FormControl<string>;
  }>;

  submitForm(): void {
    if (this.validateForm.valid) {
      const userData = this.validateForm.value;
      this.apiClientService.registerUser(userData).subscribe((response) => {
        console.log('Applicant registered successfully:', response);
        const applicantId = response.user.id
        this.router.navigate(['/profile', applicantId]);
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


  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(private fb: NonNullableFormBuilder, private apiClientService: ApiClientService, private router: Router) {
    this.validateForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      checkPassword: ['', [Validators.required, this.confirmationValidator]],
      name: ['', [Validators.required]],
      // phoneNumber: ['', [Validators.required]],
      // address: ['', [Validators.required]],
      // experience: ['', [Validators.required]],
      // skillTags: ['', [Validators.required]],
      // hourlyRate: ['', [Validators.required]],
      // agree: [false]
    });
    
  }
}
