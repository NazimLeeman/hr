import { Component } from '@angular/core';
import { FormGroup, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiClientService } from '../api-client.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  applicantId: number = 0;
  skillTags: string = '';
  showSkillTagsForm: boolean = false;
  validateForm: FormGroup<{
    skillTags: FormControl<string>;
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
      this.skillTags = data.data.skillTags;
      },
      (error) => {
          console.error('Error fetching data from the API', error);
      }
    );
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const updatedData = this.validateForm.value;
      console.log('merged data:', updatedData)
      // const updatedData = this.validateForm.value;
      this.apiClientService.updateApplicantData(this.applicantId, updatedData).subscribe((response) => {
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
    this.showSkillTagsForm = !this.showSkillTagsForm;
  }

  constructor(private fb: NonNullableFormBuilder, private apiClientService: ApiClientService, private router: Router, private route: ActivatedRoute) {
    this.validateForm = this.fb.group({
      skillTags: ['', [Validators.required]],
    })
  }
}
