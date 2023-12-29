import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Input, OnInit } from '@angular/core';

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

  showSignUp(): boolean {
    return this.showSignUpButton;
  }

  signUp() {
    this.router.navigate(['/signup']);
  }

  submitForm(): void {
    console.log('submit', this.validateForm.value);
  }
}
