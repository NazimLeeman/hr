import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiClientService } from '../../../services/apiClient/api-client.service';
import { switchMap } from 'rxjs/operators';
import { SuitableSkill, UserResponse } from '../../../interfaces/IUserResponse.interface';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit {
  applicantId: number = 0;
  skillTags: string[] = [];
  showSkillTagsForm: boolean = false;
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
  validateForm: FormGroup<{
    listOfSelectedValue: FormControl<string[]>;
  }>

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params) => {
          this.applicantId = params['applicantId'];
          return this.apiClientService.getApplicantData(this.applicantId);
      })
  ).subscribe(
      (data: UserResponse) => {
      this.skillTags = data.data.skillTags;
      },
      (error) => {
          console.error('Error fetching data from the API', error);
      }
    );
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const updatedData = this.suitableData();
      console.log('merged data:', updatedData)
      this.apiClientService.updateApplicantData(this.applicantId, updatedData).subscribe((response) => {
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

  suitableData(): SuitableSkill {
    const skillTags = this.validateForm.get('listOfSelectedValue')?.value || [];

    const newSkillTags = `${skillTags}`;
    const mergedData = {
      skillTags: [...this.skillTags, newSkillTags]
    };
    
    return mergedData;
  }

  formatSkills(skillsStringArray: string[]): string[] {
    const skillsString = skillsStringArray[0];
    const skillsArray = skillsString.split(',');
  
    return skillsArray;
  }

  constructor(private fb: NonNullableFormBuilder, private apiClientService: ApiClientService, private router: Router, private route: ActivatedRoute) {
    this.validateForm = this.fb.group({
      listOfSelectedValue: [[] as string[], [Validators.required]]
    })
  }
}
