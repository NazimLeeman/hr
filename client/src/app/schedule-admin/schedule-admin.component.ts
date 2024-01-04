import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiClientService } from '../api-client.service';

@Component({
  selector: 'app-schedule-admin',
  templateUrl: './schedule-admin.component.html',
  styleUrl: './schedule-admin.component.css'
})
export class ScheduleAdminComponent {
  showForm: boolean = false;
  validateForm: FormGroup<{
    day: FormControl<string>,
    slotStarts: FormControl<string>,
    slotEnds: FormControl<string>
  }>

  submitForm(): void {
    if (this.validateForm.valid) {
      const userData = this.validateForm.value;
      this.apiClientService.registerUser(userData).subscribe((response) => {
        console.log('Schedule Posted successfully:', response);
        const applicantId = response.user.id
        this.router.navigate(['/successful']);
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

  constructor(private fb: NonNullableFormBuilder, private apiClientService: ApiClientService, private router: Router) {
    this.validateForm = this.fb.group({
      slotStarts: ['', [Validators.required]],
      slotEnds: ['', [Validators.required]],
      day: ['', [Validators.required]]
    })
  }
}
