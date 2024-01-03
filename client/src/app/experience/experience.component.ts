import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiClientService } from '../api-client.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent implements OnInit {
  applicantId: number = 0;
  experience: string = '';
  showExperienceForm: boolean = false;
  validateForm: FormGroup<{
    restaurantName: FormControl<string>;
    position: FormControl<string>;
    responsibilities: FormControl<string>;
    years: FormControl<string>;
  }>

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params) => {
          this.applicantId = params['applicantId'];
          return this.apiClientService.getApplicantData(this.applicantId);
      })
  ).subscribe(
      (data: any) => {
        console.log('API Response:', data);
      this.experience = data.data.experience;
      },
      (error) => {
          console.error('Error fetching data from the API', error);
      }
    );
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const mergedData = this.mergeFormData();
      console.log('merged data:', mergedData)
      // const updatedData = this.validateForm.value;
      this.apiClientService.updateApplicantData(this.applicantId, mergedData).subscribe((response) => {
        console.log('Applicant updated successfully:', response);
        location.reload();
      },
      (error) => {
        console.log("Error during update", error)
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

  toggleExperienceForm(): void {
    this.showExperienceForm = !this.showExperienceForm;
  }

  mergeFormData(): any {
    const restaurantName = this.validateForm.get('restaurantName')?.value || '';
    const position = this.validateForm.get('position')?.value || '';
    const responsibilities = this.validateForm.get('responsibilities')?.value || '';
    const years = this.validateForm.get('years')?.value || '';

    const mergedData = {
      experience: `${restaurantName} ${position} ${responsibilities} ${years}`
    };
    
    return mergedData;
  }

  constructor(private fb: NonNullableFormBuilder,private route: ActivatedRoute, private apiClientService: ApiClientService, private router: Router) {
    this.validateForm = this.fb.group({
      restaurantName: ['', [Validators.required]],
      position: ['', [Validators.required]],
      responsibilities: ['', [Validators.required]],
      years: ['', [Validators.required]],
    })
  }
}
