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
import { Employee } from '../payroll/payroll.component';

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
  sortColumn: string = 'id';
  sortOrder: 'asc' | 'desc' = 'asc';
  isLoading = false;
  employeeId = 0;
  @ViewChild(AddressComponent) addressComponent!: AddressComponent;

  validateFormPartOne: FormGroup<{
    firstName: FormControl<string>,
    lastName: FormControl<string>,
    email: FormControl<string>,
    password: FormControl<string>,
    phoneNumber: FormControl<string>,
    // address: FormControl<string>;
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
      (data: any) => {
        console.log('API Response:', data);
        this.filterData = data.data
        this.filterData.forEach((employee) => employee.position && employee.position.position !== 'owner')
        if (this.filterData.length > 0) {
          this.apiData = data.data;
          this.apiData.sort((a: any, b: any) => a.id - b.id);
          console.log('sorted data',this.apiData)
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
        console.log('Employee Created successfully:', response);
        this.employeeId = response.user.id;
        this.submitAddressFormFromParent(this.employeeId);
        this.router.navigate([this.signInRoute +  '/' +  this.employeeId]);
        this.modalService.success({
          nzTitle: 'Success',
          nzContent: 'Employee Created successfully.',
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

  showModal(employeeId: number, skillTags: string[]): void {
    this.selectedEmployeeId = employeeId;
    this.selectedEmployeeSkill = skillTags;
    this.isVisible = true;
    console.log(this.selectedEmployeeId)
    console.log(this.selectedEmployeeSkill)
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
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

  handleSort(sort: { key: string; value: 'ascend' | 'descend' }) {
    this.sortColumn = sort.key;
    this.sortOrder = sort.value === 'ascend' ? 'asc' : 'desc';
    this.sortData();
  }
  
  sortData() {
    this.apiData = this.apiData.sort((a, b) => {
      const aValue = a[this.sortColumn];
      const bValue = b[this.sortColumn];
  
      if (this.sortOrder === 'asc') {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    });
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
      // address: ['', [Validators.required]],
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
