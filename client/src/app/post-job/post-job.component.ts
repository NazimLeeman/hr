import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiClientService } from '../api-client.service';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrl: './post-job.component.css'
})
export class PostJobComponent {
  apiData: any[] = [];
  showForm: boolean = false;
  listOfOption: string[] = ['Customer Service',
  'Communication Skills',
  'Menu Knowledge',
  'Order Taking',
  'Upselling',
  'Table Service',
  'Time Management',
  'Multitasking',
  'Problem-Solving',
  'Culinary Creativity',
  'Menu Planning and Development',
  'Food Presentation',
  'Cooking Techniques',
  'Ingredient Knowledge',
  'Time Management',
  'Team Leadership'];
  listOfSelectedValue = [];
  responsibilities: string[] = [];

  validateForm: FormGroup<{
    jobRole: FormControl<string>,
    jobNature: FormControl<string>;
    jobDescription: FormControl<string>;
    experience: FormControl<string>;
    responsibilities: FormControl<string[]>;
    hourlyRate: FormControl<string>;
    listOfSelectedValue: FormControl<string[]>;
    datePicker: FormControl<[Date] | null>
  }>

  ngOnInit(): void {
    this.apiClientService.getAllJobForRestaurant().subscribe(
      (data: any) => {
        console.log('API Response:', data);
        this.apiData = data.data;
      },
      (error) => {
        console.error('Error fetching data from the API', error);
      }
    );
  }

  submitForm(): void {
    console.log('clicked')
    if (this.validateForm.valid) {
      const userData = this.constructJobData();
      console.log(userData)
      this.apiClientService.postJob(userData).subscribe((response) => {
        console.log('Job Posted successfully:', response);
        location.reload();
        // this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.log("Error during posting", error)
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

  constructJobData(): any {
    const {
      jobRole,
      jobNature,
      jobDescription,
      experience,
      responsibilities,
      hourlyRate,
      listOfSelectedValue,
      datePicker
    } = this.validateForm.value;

    const mergedData = {
      jobRole,
      jobNature,
      jobDescription,
      experience,
      responsibilities: [responsibilities],
      hourlyRate,
      skillTags: listOfSelectedValue,
      applicationDeadline: datePicker 
    };
    return mergedData;
  }

  constructor(private fb: NonNullableFormBuilder, private apiClientService: ApiClientService, private router: Router) {
    this.validateForm = this.fb.group({
      jobRole: ['', [Validators.required]],
      jobNature: ['', [Validators.required]],
      jobDescription: ['', [Validators.required]],
      experience: ['', [Validators.required]],
      responsibilities: [[] as string[], [Validators.required]],
      hourlyRate: ['', [Validators.required]],
      listOfSelectedValue: [[] as string[], [Validators.required]],
      datePicker: this.fb.control<[Date] | null>(null)
    })
  }
}
