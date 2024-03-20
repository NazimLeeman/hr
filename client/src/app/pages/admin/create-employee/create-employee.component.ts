import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiClientService } from '../../../services/apiClient/api-client.service';
import { switchMap } from 'rxjs/operators';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { CloudinaryService } from '../../../services/cloudinary/cloudinary.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddressComponent } from '../../../component/address/address.component';
import { ApplicantDataResponse } from '../../../interfaces/IEmployeeResponse.interface';

interface FilterData {
  position: {
    position: string
  }
}

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {
  selectedEmployeeId = 0;
  isVisible: boolean =false;
  isOkLoading = false;
  showForm: boolean = false;
  selectedEmployeeSkill: string[] = [];
  skillTags: string[] = [];
  // showFormTwo: boolean = false;
  apiData: any[] = [];
  filterData: FilterData[] = [];
  currentPage: number = 1; 
  pageSize: number = 6;
  @Input() signInRoute: string = '/admin/position';
  selectedService: string = 'INVENTORY';
  selectedServiceOptions: string = '';
  isLoading = false;
  employeeId = 0;
  @ViewChild(AddressComponent) addressComponent!: AddressComponent;

  validateFormPartOne: FormGroup<{
    firstName: FormControl<string>,
    lastName: FormControl<string>,
    email: FormControl<string>,
    password: FormControl<string>,
    phoneNumber: FormControl<string>,
    hourlyRate: FormControl<string>;
    imageUrl: FormControl<string>;
    phoneNumberPrefix: FormControl<'+86' | '+87' | '+880'>;
  }>
  
  validateFormPartTwo: FormGroup<{
    position: FormControl<string>;
    selectedService: FormControl<string>;
  }>

  ngOnInit(): void {
    this.apiClientService.getAllEmployee().subscribe(
      (data: ApplicantDataResponse) => {
        this.filterData = data.data
        const newData = data.data.filter((employee) => employee.position.position !== 'owner')
        if (this.filterData.length > 0) {
          this.apiData = newData
          this.apiData.sort((a: any, b: any) => a.id - b.id);
        }
      },
      (error) => {
        console.error('Error fetching data from the API', error);
      }
    );
  }

  submitFormPartOne(): void {
    this.isLoading = true;
    if (this.validateFormPartOne.valid) {
      const employeeData = this.validateFormPartOne.value;
      const name = `${employeeData.firstName} ${employeeData.lastName}`;
      const updatedEmployeeData = { ...employeeData, name };
      updatedEmployeeData.imageUrl = this.uploadedImageUrl;
      delete updatedEmployeeData.firstName;
      delete updatedEmployeeData.lastName;
      this.apiClientService.createEmployee(updatedEmployeeData).subscribe((response) => {
        this.employeeId = response.user.id;
        this.submitAddressFormFromParent(this.employeeId);
        this.router.navigate([this.signInRoute +  '/' +  this.employeeId]);
        this.modalService.success({
          nzTitle: 'Success',
          nzContent: 'Employee Created successfully.'
        });
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


  goToNextStep() {
    this.showForm = true;
  }

  onServiceChange(selectedService: string): void {
    this.selectedServiceOptions = selectedService;
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

  showModal(employeeId: number, skillTags: string[]): void {
    this.selectedEmployeeId = employeeId;
    this.selectedEmployeeSkill = skillTags;
    this.isVisible = true;
  }

  handleButtonClick(): void {
    this.isVisible = false;
  }

  formatSkills(skillsStringArray: string[]): string[] {
    const skillsString = skillsStringArray[0];
    const skillsArray = skillsString.split(',');
  
    return skillsArray;
  }

  handlePageIndexChange(pageIndex: number): void {
    this.currentPage = pageIndex;
  }

  submitAddressFormFromParent(employeeId: number): void {
    this.addressComponent.handleLoginClick(employeeId);
  }

  constructor(private fb: NonNullableFormBuilder, private apiClientService: ApiClientService, private router: Router, private route: ActivatedRoute, private cloudinary: CloudinaryService, private msg: NzMessageService, private modalService: NzModalService) {
    this.validateFormPartOne = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      hourlyRate: ['', [Validators.required]],
      imageUrl: [''],
      phoneNumberPrefix: ['+880', Validators.required as any]
    }),
    this.validateFormPartTwo = this.fb.group({
      position: ['', [Validators.required]],
      selectedService: ['INVENTORY', [Validators.required]]
    })
  }
}
