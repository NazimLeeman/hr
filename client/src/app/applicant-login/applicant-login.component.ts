import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applicant-login',
  templateUrl: './applicant-login.component.html',
  styleUrl: './applicant-login.component.css'
})
export class ApplicantLoginComponent {
  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true]
  });
  constructor(private fb: NonNullableFormBuilder, private router: Router) {}

  signUp() {
    this.router.navigate(['/signup']);
  }

  submitForm(): void {
    console.log('submit', this.validateForm.value);
  }

}
