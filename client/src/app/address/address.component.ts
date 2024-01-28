import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiClientService } from '../api-client.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() applicantId = 0;
  @Input() employeeId = 0;
  @Input() address: string = '';
  @Output() addressFormReady = new EventEmitter<FormGroup>();
  addressForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiClientService: ApiClientService
  ) {
    this.addressForm = this.formBuilder.group({
      address: ['', [Validators.required]],
    });
    this.addressFormReady.emit(this.addressForm);
  }

  @ViewChild('mapSearchField') searchField: ElementRef | undefined;
  ngAfterViewInit(): void {
    const searchBox = new google.maps.places.SearchBox(
      this.searchField?.nativeElement
    );

    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      if (places?.length === 0) {
        return;
      }
      places?.forEach((place:any) => {
        console.log(place.name, place.address_components);
        console.log(
          place.geometry?.location?.lat(),
          place.geometry?.location?.lng()
        );
      });
      
    });
  }
  /**
   * Checks if a form field is invalid based on its name.
   * @param fieldName The name of the form field to check.
   * @returns True if the field is invalid and has been touched or modified, false otherwise.
   */
  isFieldInvalid(fieldName: string): boolean {
    const fieldControl = this.addressForm.get(fieldName);
    if (fieldControl) {
      return (
        fieldControl.invalid && (fieldControl.dirty || fieldControl.touched)
      );
    }
    return false;
  }

  handleLoginClick(): void {
    if (this.addressForm.valid) {
      if (this.applicantId > 0) {
        const addressData = this.addressForm.value;
        console.log(addressData, this.applicantId)
        this.apiClientService.updateApplicantData(this.applicantId, addressData).subscribe((response) => {
          console.log('Applicant updated successfully:', response);
          location.reload();
        },
        (error) => {
          console.log("Error during update", error)
        })
      } else {
          const addressData = this.addressForm.value;
        console.log(addressData, this.employeeId)
        this.apiClientService.updateEmployee(addressData,this.employeeId).subscribe((response) => {
          console.log('Employee updated successfully:', response);
          // location.reload();
        },
        (error) => {
          console.log("Error during update", error)
        })
      } 
    }
  }
}
