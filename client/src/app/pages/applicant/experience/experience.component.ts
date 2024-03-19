import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiClientService } from '../../../services/apiClient/api-client.service';
import { switchMap } from 'rxjs/operators';
import { UserResponse } from '../../../interfaces/IUserResponse.interface';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent implements OnInit {
  isLoading: boolean = false;
  applicantId: number = 0;
  experience: string[] = [];
  name: string ='';
  position: string ='';
  careerDuration: string ='';
  responsibilities: string ='';
  showExperienceForm: boolean = false;
  date = null;
  validateForm: FormGroup<{
    restaurantName: FormControl<string>;
    position: FormControl<string>;
    responsibilities: FormControl<string>;
    rangePicker: FormControl<[Date, Date] | null>;
  }>

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params) => {
          this.applicantId = params['applicantId'];
          return this.apiClientService.getApplicantData(this.applicantId);
      })
  ).subscribe(
      (data: UserResponse) => {
        console.log('API Response:', data);
      this.experience = data.data.experience || [];
      const experienceParts = this.experience[0].split('-');
      this.name = experienceParts[0];
          this.position = experienceParts[1];
          this.careerDuration = experienceParts[2];
          this.responsibilities = experienceParts[3];
          this.isLoading = true;
      },
      (error) => {
          console.error('Error fetching data from the API', error);
      }
    );
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const mergedData = this.mergeFormData();
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

  getExperiencePart(experience: string, partIndex: number): string {
    const experienceParts = experience.split('-');
    return experienceParts.length > partIndex ? experienceParts[partIndex].trim() : '';
  }

  mergeFormData(): any {
    const restaurantName = this.validateForm.get('restaurantName')?.value || '';
    const position = this.validateForm.get('position')?.value || '';
    const responsibilities = this.validateForm.get('responsibilities')?.value || '';
    const years = this.validateForm.get('rangePicker')?.value || '';

    const newExperience = `${restaurantName}-${position}-${responsibilities}-${years}`;
    const mergedData = {
      experience: [...this.experience, newExperience]
    };
    
    return mergedData;
  }

  formatDateRange(experience: string): string {
    const dateParts = experience.split(',');
    const startDate = new Date(dateParts[0]);
    const endDate = new Date(dateParts[1]);
  
    const formattedStartDate = this.formatDate(startDate);
    const formattedEndDate = this.formatDate(endDate);
  
    return `From ${formattedStartDate} to ${formattedEndDate}`;
  }
  
  formatDate(date: Date): string {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
  
    return `${month} ${day} ${year}`;
  }

  constructor(private fb: NonNullableFormBuilder,private route: ActivatedRoute, private apiClientService: ApiClientService, private router: Router) {
    this.validateForm = this.fb.group({
      restaurantName: ['', [Validators.required]],
      position: ['', [Validators.required]],
      responsibilities: ['', [Validators.required]],
      rangePicker: this.fb.control<[Date, Date] | null>(null),
    })
  }
}
