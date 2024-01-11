import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiClientService } from '../api-client.service';
import { switchMap } from 'rxjs/operators';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { CloudinaryService } from '../cloudinary.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {
  showForm: boolean = false;
  // showFormTwo: boolean = false;
  apiData: any[] = [];
  @Input() signInRoute: string = '/admin/position';
  selectedService: string = 'INVENTORY';
  selectedServiceOptions: string = '';

  validateFormPartOne: FormGroup<{
    firstName: FormControl<string>,
    lastName: FormControl<string>,
    email: FormControl<string>,
    password: FormControl<string>,
    phoneNumber: FormControl<string>,
    address: FormControl<string>;
    hourlyRate: FormControl<string>;
    imageUrl: FormControl<string>;
  }>
  
  validateFormPartTwo: FormGroup<{
    position: FormControl<string>;
    selectedService: FormControl<string>;
  }>

  ngOnInit(): void {
    this.apiClientService.getAllEmployee().subscribe(
      (data: any) => {
        console.log('API Response:', data);
        this.apiData = data.data;
      },
      (error) => {
        console.error('Error fetching data from the API', error);
      }
    );
  }

  submitFormPartOne(): void {
    if (this.validateFormPartOne.valid) {
      const employeeData = this.validateFormPartOne.value;
      const name = `${employeeData.firstName} ${employeeData.lastName}`;
      const updatedEmployeeData = { ...employeeData, name };
      updatedEmployeeData.imageUrl = this.uploadedImageUrl;
      delete updatedEmployeeData.firstName;
      delete updatedEmployeeData.lastName;
      this.apiClientService.createEmployee(updatedEmployeeData).subscribe((response) => {
        console.log('Employee Created successfully:', response);
        const employeeId = response.user.id
        this.router.navigate([this.signInRoute +  '/' +  employeeId]);
      },
      (error) => {
        console.log("Error during resgistration", error)
      })
    } else {
      Object.values(this.validateFormPartOne.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  // submitFormPartTwo(): void {
  //   if (this.validateFormPartTwo.valid) {
  //     const userData = this.validateFormPartTwo.value;
  //     this.apiClientService.registerUser(userData).subscribe((response) => {
  //       console.log('Position posted successfully:', response);
  //       const applicantId = response.user.id
  //       this.router.navigate(['/successful']);
  //     },
  //     (error) => {
  //       console.log("Error during resgistration", error)
  //     })
  //   } else {
  //     Object.values(this.validateFormPartTwo.controls).forEach(control => {
  //       if (control.invalid) {
  //         control.markAsDirty();
  //         control.updateValueAndValidity({ onlySelf: true });
  //       }
  //     });
  //   }
  // }

  goToNextStep() {
    this.showForm = true;
  }

  onServiceChange(selectedService: string): void {
    this.selectedServiceOptions = selectedService;
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

  constructor(private fb: NonNullableFormBuilder, private apiClientService: ApiClientService, private router: Router, private route: ActivatedRoute, private cloudinary: CloudinaryService, private msg: NzMessageService) {
    this.validateFormPartOne = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
      hourlyRate: ['', [Validators.required]],
      imageUrl: ['']
    }),
    this.validateFormPartTwo = this.fb.group({
      position: ['', [Validators.required]],
      selectedService: ['INVENTORY', [Validators.required]]
    })
  }
}
