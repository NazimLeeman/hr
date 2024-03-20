import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Input, OnInit } from '@angular/core';
import { ApiClientService } from '../../services/apiClient/api-client.service';
import { ApplicantDataService } from '../../services/applicant/applicant-data.service';
import { UserData, UserResponse } from '../../interfaces/IUserResponse.interface';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  @Input() title: string = 'Welcome Back!';
  @Input() signInLabel: string = 'Sign in';
  @Input() signUpLabel: string = 'Sign Up';
  @Input() showSignUpButton: boolean = true;
  @Input() signInRoute: string = '/applicant/';
  isLoading: boolean = false;
  data!: UserResponse;
  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true]
  });
  constructor(private fb: NonNullableFormBuilder,private apiClientService: ApiClientService, private router: Router, private applicantDataService:ApplicantDataService) {}

  showSignUp(): boolean {
    return this.showSignUpButton;
  }

  signUp() {
    this.router.navigate(['/signup']);
  }

  submitForm(): void {
    this.isLoading = true;
    if (this.validateForm.valid) {
      const loginData = this.validateForm.value;
      this.apiClientService.loginUser(loginData).subscribe((response) => {
        const data:UserResponse = { data: response.applicant };
        this.applicantDataService.setNewApplicantData(data)
        const jwtToken = response.token;
        localStorage.setItem('token', jwtToken);
        const applicantId = response.applicant.id
        this.router.navigate([`${this.signInRoute   }/${   applicantId  }/profile/${  applicantId}` ])
      },
      (error) => {
        console.log("Error during login", error)
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
}
