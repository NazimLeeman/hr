import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators
} from '@angular/forms';
import { ApiClientService } from '../../../services/apiClient/api-client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CloudinaryService } from '../../../services/cloudinary/cloudinary.service';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { AddressComponent } from '../../../component/address/address.component';
import { RegisterResponse } from '../../../interfaces/IResgister.interface';
import { UserResponse } from '../../../interfaces/IUserResponse.interface';
import { ApplicantDataService } from '../../../services/applicant/applicant-data.service';

@Component({
  selector: 'app-registration-summary',
  templateUrl: './registration-summary.component.html',
  styleUrl: './registration-summary.component.css'
})
export class RegistrationSummaryComponent implements OnInit {
  isLoading = false;
  loading = false;
  avatarUrl?: string;
  applicantId: number = 0;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  address: string = '';
  hourlyRate: number = 0;
  phoneNumber: number = 0;
  password: string = '';
  imageUrl = '';

  public isDataAvailable = false;
  public failedToLoad = false;
  public amountValue: any;
  @ViewChild(AddressComponent) addressComponent!: AddressComponent;

  validateForm: FormGroup<{
    phoneNumber: FormControl<string>,
    hourlyRate: FormControl<number>;
    phoneNumberPrefix: FormControl<'+86' | '+87' | '+880'>;
    imageUrl: FormControl<string>;
  }>

ngOnInit(): void {
  this.route.params.pipe(
      switchMap((params) => {
          this.applicantId = params['applicantId'];
          return this.apiClientService.getRegisterData(this.applicantId);
      })
  ).subscribe(
      (data: RegisterResponse) => {
          this.email = data.data.email;
          this.password = "*******";

          this.additionOnInit();
          this.isLoading = true
      },
      (error) => {
          console.error('Error fetching data from the API', error);
      }
  );
}

additionOnInit(): void {
  this.route.params.pipe(
      switchMap((params) => {
          this.applicantId = params['applicantId'];
          return this.apiClientService.getApplicantData(this.applicantId);
      })
  ).subscribe(
  // this.applicantDataService.newApplicantDataEvent.subscribe(
      (data: UserResponse) => {
      if (data.data.name) {
        const spaceIndex = data.data.name.indexOf(' ');
        if (spaceIndex !== -1) {
          this.firstName = data.data.name.substring(0, spaceIndex);
          this.lastName = data.data.name.substring(spaceIndex + 1);
        } else {
          this.firstName = data.data.name;
        }
      }

      this.uploadedImageUrl = data.data.imageUrl;
      this.hourlyRate = data.data.hourlyRate;
      this.address = data.data.address;
      this.phoneNumber = data.data.phoneNumber;
      },
      (error) => {
          console.error('Error fetching data from the API', error);
      }
  );
}

  submitForm(): void {
    if (this.validateForm.valid) {
      const updatedData = this.validateForm.value;
      updatedData.imageUrl = this.uploadedImageUrl;
      console.log(updatedData)
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
    this.submitAddressFormFromParent();
  }

  uploadedImageUrl: string | undefined;
  private successMessageDisplayed = false;

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status === 'done' && !this.successMessageDisplayed) {
      this.msg.success(`${info.file.name} file uploaded successfully`);
      this.successMessageDisplayed = true;
      this.uploadedImageUrl = info.file.response.url; 
    } 
  }


  selectFile(event: any): void {
    const file = event?.file?.originFileObj;

      this.cloudinary.cloudUpload(file, 'user123') 
      .subscribe(
        (response) => {
          const fakeEvent: NzUploadChangeParam = {
            file: {
              ...event.file,
              status: 'done',
              response: response
            },
            fileList: [...event.fileList]
          };
  
          this.handleChange(fakeEvent);
        },
        (error) => {
          console.error('Cloudinary API Error:', error);
          const fakeEvent: NzUploadChangeParam = {
            file: {
              ...event.file,
              status: 'error',
              response: error
            },
            fileList: [...event.fileList]
          };
  
          this.handleChange(fakeEvent);
        }
      );
  }

  salaryCal() {
    const result = this.hourlyRate * 172;
    return `£${result}`
  }

  submitAddressFormFromParent(): void {
    this.addressComponent.handleLoginClick(this.applicantId);
  }

  constructor(private fb: NonNullableFormBuilder, private route: ActivatedRoute, private apiClientService: ApiClientService, private router: Router, private msg: NzMessageService, private cloudinary: CloudinaryService, private applicantDataService:ApplicantDataService) {
    this.validateForm = this.fb.group({
      phoneNumber: ['', [Validators.required]],
      imageUrl: [''],
      hourlyRate: [0, [Validators.required]],
      phoneNumberPrefix: ['+880', Validators.required as any]
    })
  }
}
