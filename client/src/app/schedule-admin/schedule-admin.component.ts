import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiClientService } from '../api-client.service';
import { NzCalendarMode } from 'ng-zorro-antd/calendar';
interface Employee {
  id: number;
  restaurantId: number;
  name: string;
  email: string;
}

interface UserOption {
  id: number;
  name: string;
}

@Component({
  selector: 'app-schedule-admin',
  templateUrl: './schedule-admin.component.html',
  styleUrl: './schedule-admin.component.css'
})
export class ScheduleAdminComponent {
  optionList: UserOption[] = [];
  time: Date | null = null;
  selectedUser: UserOption | null = null;
  apiData: any[] = [];
  isLoading = false;
  // calendarMode = NzCalendarMode;
  listOfOption = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  listOfSelectedValue: string[] = [];
  showForm: boolean = false;
  validateForm: FormGroup<{
    selectedUser: FormControl<UserOption | null>,
    selectedDate: FormControl<[Date] | null>,
    day: FormControl<string>,
    slotStarts:FormControl<[Date] | null>,
    slotEnds:FormControl<[Date] | null>
  }>

  ngOnInit(): void {
    this.apiClientService.getAllScheduleForRestaurant().subscribe(
      (data: any) => {
        console.log('API Response:', data);
        this.apiData = data.data;
      },
      (error) => {
        console.error('Error fetching data from the API', error);
      }
    );
    this.loadMore();
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

  submitForm(): void {
    console.log("clicked")
    if (this.validateForm.valid) {
      const userData = this.constructJobData();
      console.log(userData)
      this.apiClientService.postSchedule(userData).subscribe(
        (response) => {
          console.log('Schedule Posted successfully:', response);
          location.reload()
        },
      (error) => {
        console.log("Error during resgistration", error)
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

  isNotSelected(value: string): boolean {
    return this.listOfSelectedValue.indexOf(value) === -1;
  }

  constructJobData(): any {
    const {
      selectedUser,
      slotStarts,
      slotEnds,
      day,
    } = this.validateForm.value;

    const mergedData = {
      employeeId: selectedUser?.id,
      day,
      slotStart: slotStarts,
      slotEnds: slotEnds
    };
    return mergedData;
  }
  

  log1(value: Date): void {
    const formattedTime = value.toLocaleTimeString('en-US', {
      hour12: true,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
    console.log(formattedTime);
  }

  log2(value: Date): void {
    const formattedTime = value.toLocaleTimeString('en-US', {
      hour12: true,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
  
    console.log(formattedTime);
  }


  formatUserOption(option: UserOption): string {
    return `${option.name} - ${option.id}`;
  }

  parseDate(dateString: string): Date {
    return new Date(dateString);
  }

  // selectedDate = new Date('2017-01-25');

  // selectChange(select: Date): void {
  //   console.log(`Select value: ${select}`);
  // }

  // listDataMap = {
  //   eight: [
  //     { type: 'warning', content: 'This is warning event.' },
  //     { type: 'success', content: 'This is usual event.' }
  //   ],
  //   ten: [
  //     { type: 'warning', content: 'This is warning event.' },
  //     { type: 'success', content: 'This is usual event.' },
  //     { type: 'error', content: 'This is error event.' }
  //   ],
  //   eleven: [
  //     { type: 'warning', content: 'This is warning event' },
  //     { type: 'success', content: 'This is very long usual event........' },
  //     { type: 'error', content: 'This is error event 1.' },
  //     { type: 'error', content: 'This is error event 2.' },
  //     { type: 'error', content: 'This is error event 3.' },
  //     { type: 'error', content: 'This is error event 4.' }
  //   ]
  // };

  listDataMap = {
    sunday: [
      { type: 'success', content: 'Meeting with Team A' },
      { type: 'error', content: 'Project deadline' }
    ],
    monday: [
      { type: 'warning', content: 'Client call' },
      { type: 'success', content: 'Project review' }
    ],
    tuesday: [
      { type: 'success', content: 'Training session' },
      { type: 'info', content: 'Lunch with colleagues' }
    ],
    wednesday: [
      { type: 'success', content: 'Workshop on Angular' },
      { type: 'error', content: 'Client meeting' }
    ],
    thursday: [
      { type: 'warning', content: 'Team brainstorming' },
      { type: 'success', content: 'Project planning' }
    ],
    friday: [
      { type: 'info', content: 'Casual Friday' },
      { type: 'success', content: 'Release deployment' }
    ],
    saturday: [
      { type: 'success', content: 'Family outing' },
      { type: 'error', content: 'Personal project work' }
    ]
  };
  

  getMonthData(date: Date): number | null {
    if (date.getMonth() === 8) {
      return 1394;
    }
    return null;
  }


  constructor(private fb: NonNullableFormBuilder, private apiClientService: ApiClientService, private router: Router) {
    this.validateForm = this.fb.group({
      selectedUser:this.fb.control<UserOption | null>(null),
      selectedDate: this.fb.control<[Date] | null>(null),
      slotStarts: this.fb.control<[Date] | null>(null),
      slotEnds: this.fb.control<[Date] | null>(null),
      day: ['', [Validators.required]]
    })
  }
}
