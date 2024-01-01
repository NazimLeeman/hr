import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiClientService } from '../api-client.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {
  @Input() firstName: string = '';
  @Input() lastName: string = '';
  showForm: boolean = false;

  validateForm: FormGroup<{
    phoneNumber: FormControl<string>,
    address: FormControl<string>;
    experience: FormControl<string>;
    skillTags: FormControl<string>;
    hourlyRate: FormControl<string>;
    serviceAccess: FormControl<string>;
  }>

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
      phoneNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
      experience: ['', [Validators.required]],
      skillTags: ['', [Validators.required]],
      hourlyRate: ['', [Validators.required]],
      serviceAccess: ['', [Validators.required]],
    })
  }
}
