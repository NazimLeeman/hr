import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiClientService } from '../api-client.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrl: './position.component.css'
})
export class PositionComponent {
  employeeId: number = 0;
  serviceAccess: string[] = [];
  listOfOption: string[] = ['INVENTORY','MENU BUILDER', 'KDS', 'POS', 'MARKETPLACE'];
  listOfSelectedValue = [];
  validateForm: FormGroup<{
    position: FormControl<string>;
    listOfSelectedValue: FormControl<string[]>;
  }>

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.employeeId = +params['employeeId'];  
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const updatedData = this.suitableData();
      console.log('merged data:', updatedData)
      this.apiClientService.postPosition( updatedData).subscribe((response) => {
        console.log('Applicant position posted successfully:', response);
        this.router.navigate(['/admin/createEmployee'])
      },
      (error) => {
        console.log("Error during position posting", error)
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


  suitableData(): any {
    const serviceAccess = this.validateForm.get('listOfSelectedValue')?.value || [];
  
    const mergedData = {
      services: serviceAccess,  
      position: this.validateForm.get('position')?.value || '',
      employeeId: this.employeeId 
    };
  
    return mergedData;
  }
    constructor(private fb: NonNullableFormBuilder, private apiClientService: ApiClientService, private router: Router, private route: ActivatedRoute) {
      this.validateForm = this.fb.group({
        listOfSelectedValue: [[] as string[], [Validators.required]],
        position: ['', [Validators.required]]
      })
    }
  }

