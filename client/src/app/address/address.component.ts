import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {
  addressForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.addressForm = this.formBuilder.group({
      address: ['', [Validators.required]],
    });
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
      const loginData = this.addressForm.value;
    }
  }
}
