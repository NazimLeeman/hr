import { Component } from '@angular/core';
import { FormGroup, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiClientService } from '../api-client.service';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrl: './payroll.component.css'
})
export class PayrollComponent {
  showForm: boolean = false;
  hourlyRate: number = 50;
  totalHours: number = 60;
  totalDeduction: number = 100;
  validateForm: FormGroup<{
    hourlyRate: FormControl<string>,
    totalHours: FormControl<string>;
    totalDeduction: FormControl<string>;
  }>

  get netPayable(): number {
    return (this.hourlyRate * this.totalHours) - this.totalDeduction;
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const userData = this.validateForm.value;
      this.apiClientService.registerUser(userData).subscribe((response) => {
        console.log('Applicant registered successfully:', response);
        // this.router.navigate(['/success'])
        this.router.navigate(['/summary']);
        // this.showSuccessNotification();
      },
      (error) => {
        console.log("Error during resgistration", error)
      })
      // console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(private fb: NonNullableFormBuilder, private apiClientService: ApiClientService, private router: Router) {
    this.validateForm = this.fb.group({
      totalHours: ['', [Validators.required]],
      totalDeduction: ['', [Validators.required]],
      hourlyRate: ['', [Validators.required]],
    })
  }
}
