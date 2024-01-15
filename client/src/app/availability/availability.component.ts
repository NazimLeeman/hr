import { Component } from '@angular/core';
import { FormGroup, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiClientService } from '../api-client.service';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrl: './availability.component.css'
})
export class AvailabilityComponent {
  isLoading: boolean = false;
  visible = false;
  radioValue = 'A';

  validateForm: FormGroup<{
    Monday: FormControl<string>;
    Tuesday: FormControl<string>;
    Wednesday: FormControl<string>;
    Thursday: FormControl<string>;
    Friday: FormControl<string>;
    Saturday: FormControl<string>;
    Sunday: FormControl<string>;
  }>

  constructor(private fb: NonNullableFormBuilder,private route: ActivatedRoute, private apiClientService: ApiClientService, private router: Router) {
    this.validateForm = this.fb.group({
      Monday: ['', [Validators.required]],
      Tuesday: ['', [Validators.required]],
      Wednesday: ['', [Validators.required]],
      Thursday: ['', [Validators.required]],
      Friday: ['', [Validators.required]],
      Saturday: ['', [Validators.required]],
      Sunday: ['', [Validators.required]],
    })
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  submitForm(): void {
    this.visible = true;
  }
}
