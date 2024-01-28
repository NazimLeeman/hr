import { Component } from '@angular/core';
import { FormGroup, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiClientService } from '../api-client.service';
import { EmailService } from '../email.service';

interface Employee {
  id: number;
  restaurantId: number;
  name: string;
  email: string;
}

interface UserOption {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrl: './payroll.component.css'
})
export class PayrollComponent {
  optionList: UserOption[] = [];
  time: Date | null = null;
  selectedUser: UserOption | null = null;
  apiData: any[] = [];
  isLoading = false;
  showForm: boolean = false;
  hourlyRate: number = 50;
  totalHours: number = 60;
  totalDeduction: number = 100;
  employeeId: number = 0;
  validateForm: FormGroup<{
    hourlyRate: FormControl<string>,
    totalHours: FormControl<string>;
    totalDeduction: FormControl<string>;
    selectedUser: FormControl<UserOption | null>,
  }>

  get netPayable(): number {
    return (this.hourlyRate * this.totalHours) - this.totalDeduction;
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const userData = this.constructPayrollData();
      console.log(userData)
      this.apiClientService.postPayroll(userData).subscribe((response) => {
        console.log('Payroll generated successfully:', response);
        console.log(response.id)
        if(response.employeeId)
    this.apiClientService.getPayroll(response.employeeId).subscribe(
      (data: any) => {
        console.log('API Response:', data);
        this.showForm = true;
        this.apiData = data.data;
        this.hourlyRate = data.data.hourlyRate;
        this.totalHours = data.data.totalHours;
        this.totalDeduction = data.data.totalDeduction;
        this.employeeId = data.data.employeeId
      },
      (error) => {
        console.error('Error fetching data from the API', error);
      }
    );
        
      },
      (error) => {
        console.log("Error during generating", error)
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

  ngOnInit(): void {
    
    this.loadMore();
  }

  getPayrollEmployee(): void {
    if(this.selectedUser?.id)
    this.apiClientService.getPayroll(this.selectedUser.id).subscribe(
      (data: any) => {
        console.log('API Response:', data);
        this.apiData = data.data;
      },
      (error) => {
        console.error('Error fetching data from the API', error);
      }
    );
  }

  loadMore(): void {
    this.isLoading = true;
    this.apiClientService.getAllEmployee().subscribe(data => {
      console.log(data.data)
      const users: UserOption[] = data.data.map((employee: Employee) => ({ id: employee.id, name: employee.name }));
      this.isLoading = false;
      this.optionList = [...this.optionList, ...users];
    });
  }

  formatUserOption(option: UserOption): string {
    return `${option.name} - ${option.id}`;
  }

  constructPayrollData(): any {
    const {
      selectedUser,
      hourlyRate,
      totalHours,
      totalDeduction,
    } = this.validateForm.value;

    const mergedData = {
      employeeId: selectedUser?.id,
      hourlyRate: Number(hourlyRate),
      totalHours: Number(totalHours),
      totalDeduction: Number(totalDeduction)
    };
    return mergedData;
  }

  sendPayrollToEmail(): void {
    const subject = 'Payroll Information';
    const content = `Hourly Rate: ${this.hourlyRate}, Total Hours: ${this.totalHours}, Total Deduction: ${this.totalDeduction}, NetPayable: ${this.netPayable}`; 
    if (this.selectedUser) {
      const employeeEmail = this.selectedUser.email
      this.emailService.sendPayrollEmail(employeeEmail, subject, content).subscribe(
        (response) => {
          console.log('Email sent successfully', response);
        },
        (error) => {
          console.error('Error sending email', error);
        }
      );
    }
  }

  constructor(private fb: NonNullableFormBuilder, private apiClientService: ApiClientService, private router: Router, private emailService: EmailService) {
    this.validateForm = this.fb.group({
      selectedUser:this.fb.control<UserOption | null>(null),
      totalHours: ['', [Validators.required]],
      totalDeduction: ['', [Validators.required]],
      hourlyRate: ['', [Validators.required]],
    })
  }
}
