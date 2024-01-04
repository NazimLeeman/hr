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
  showForm: boolean = false;
  showFormTwo: boolean = false;
  selectedService: string = 'INVENTORY';
  selectedServiceOptions: string = '';

  validateFormPartOne: FormGroup<{
    firstName: FormControl<string>,
    lastName: FormControl<string>,
    email: FormControl<string>,
    password: FormControl<string>,
    phoneNumber: FormControl<string>,
    address: FormControl<string>;
    // experience: FormControl<string>;
    // skillTags: FormControl<string>;
    hourlyRate: FormControl<string>;
    // serviceAccess: FormControl<string>;
  }>
  
  validateFormPartTwo: FormGroup<{
    position: FormControl<string>;
    selectedService: FormControl<string>;
  }>

  submitFormPartOne(): void {
    if (this.validateFormPartOne.valid) {
      const userData = this.validateFormPartOne.value;
      this.apiClientService.registerUser(userData).subscribe((response) => {
        console.log('Employee Created successfully:', response);
        const applicantId = response.user.id
        // this.router.navigate(['/successful']);
      },
      (error) => {
        console.log("Error during resgistration", error)
      })
    } else {
      Object.values(this.validateFormPartOne.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  submitFormPartTwo(): void {
    if (this.validateFormPartTwo.valid) {
      const userData = this.validateFormPartTwo.value;
      this.apiClientService.registerUser(userData).subscribe((response) => {
        console.log('Applicant registered successfully:', response);
        const applicantId = response.user.id
        this.router.navigate(['/successful']);
      },
      (error) => {
        console.log("Error during resgistration", error)
      })
    } else {
      Object.values(this.validateFormPartTwo.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  goToNextStep() {
    this.showForm = true;
  }

  onServiceChange(selectedService: string): void {
    this.selectedServiceOptions = selectedService;
  }

  constructor(private fb: NonNullableFormBuilder, private apiClientService: ApiClientService, private router: Router) {
    this.validateFormPartOne = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
      // experience: ['', [Validators.required]],
      // skillTags: ['', [Validators.required]],
      hourlyRate: ['', [Validators.required]],
      // serviceAccess: ['', [Validators.required]],
    }),
    this.validateFormPartTwo = this.fb.group({
      position: ['', [Validators.required]],
      selectedService: ['INVENTORY', [Validators.required]]
    })
  }
}
