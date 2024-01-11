import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { ApiClientService } from '../api-client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, Observer } from 'rxjs';
import { CloudinaryService } from '../cloudinary.service';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-registration-summary',
  templateUrl: './registration-summary.component.html',
  styleUrl: './registration-summary.component.css'
})
export class RegistrationSummaryComponent implements OnInit {
  loading = false;
  avatarUrl?: string;
  applicantId: number = 0;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  address: string = '';
  hourlyRate: number = 0;
  phoneNumber: string = '';
  password: string = '';
  imageUrl = '';

  validateForm: FormGroup<{
    phoneNumber: FormControl<string>,
    address: FormControl<string>;
    hourlyRate: FormControl<number>;
    phoneNumberPrefix: FormControl<'+86' | '+87'>;
    imageUrl: FormControl<string>;
  }>

ngOnInit(): void {
  this.route.params.pipe(
      switchMap((params) => {
          this.applicantId = params['applicantId'];
          console.log(this.applicantId)
          return this.apiClientService.getRegisterData(this.applicantId);
      })
  ).subscribe(
      (data: any) => {
        console.log('API Response:', data);
          this.email = data.data.email;
          this.password = '********';

          this.additionOnInit();
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
      (data: any) => {
        console.log('API Response:', data);
      this.firstName = '';
      this.lastName = '';

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

  uploadedImageUrl: string | undefined;
  private successMessageDisplayed = false;

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
      console.log('File information:', info.file);
    console.log('File list:', info.fileList);
    }
    if (info.file.status === 'done' && !this.successMessageDisplayed) {
      this.msg.success(`${info.file.name} file uploaded successfully`);
      this.successMessageDisplayed = true;
      console.log('Upload response:', info.file.response);
      this.uploadedImageUrl = info.file.response.url; 
    } 
    // else if (info.file.status === 'error') {
    //   this.msg.error(`${info.file.name} file upload failed.`);
    //   console.error('Upload error:', info.file.error);
    // }
  }


  selectFile(event: any): void {
    const file = event?.file?.originFileObj;

      this.cloudinary.cloudUpload(file, 'user123') 
      .subscribe(
        (response) => {
          console.log('Cloudinary API Response:', response);
          const fakeEvent: NzUploadChangeParam = {
            file: {
              ...event.file,
              status: 'done',
              response: response,
            },
            fileList: [...event.fileList],
          };
  
          this.handleChange(fakeEvent);
        },
        (error) => {
          console.error('Cloudinary API Error:', error);
          const fakeEvent: NzUploadChangeParam = {
            file: {
              ...event.file,
              status: 'error',
              response: error,
            },
            fileList: [...event.fileList],
          };
  
          this.handleChange(fakeEvent);
        }
      );
  
    
  }
  

  // selectFile(event: any) {
  //   const file = event.target.files[0];
  //   this.cloudinary.cloudUpload(file, 'user123') 
  //     .subscribe(response => {
  //       this.handleChange({ file, status: 'done' });
  //     }, error => {
  //       this.handleChange({ file, status: 'error' });
  //     });
  // }
  

  // onFileSelected(event: any) {
  //   const file: File = event.target.files[0];
  //   const fileId: string = 'unique_id_for_your_file';

  //   this.cloudinary.cloudUpload(file, fileId).subscribe(
  //     (response) => {
  //       console.log('File uploaded successfully!', response);
  //     },
  //     (error) => {
  //       console.error('Error uploading file:', error);
  //     }
  //   );
  // }

  constructor(private fb: NonNullableFormBuilder, private route: ActivatedRoute, private apiClientService: ApiClientService, private router: Router, private msg: NzMessageService, private cloudinary: CloudinaryService) {
    this.validateForm = this.fb.group({
      phoneNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
      imageUrl: [''],
      hourlyRate: [0, [Validators.required]],
      phoneNumberPrefix: '+86' as '+86' | '+87'
    })
  }

}
