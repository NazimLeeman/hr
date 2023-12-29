import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrl: './employee-login.component.css'
})
export class EmployeeLoginComponent {
  // validateForm: FormGroup<{
  //   email: FormControl<string>;
  //   password: FormControl<string>;
  //   remember: FormControl<boolean>;
  // }> = this.fb.group({
  //   email: ['', [Validators.required]],
  //   password: ['', [Validators.required]],
  //   remember: [true]
  // });

  // submitForm(): void {
  //   console.log('submit', this.validateForm.value);
  // }

  // constructor(private fb: NonNullableFormBuilder) {}
}
