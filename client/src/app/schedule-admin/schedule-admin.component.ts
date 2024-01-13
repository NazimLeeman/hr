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

interface Schedule {
  id: number;
  day: string;
  slotStart: string;
  slotEnds: string;
  restaurantId: number;
  shift: string;
  employees: { id: number; name: string }[];
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-schedule-admin',
  templateUrl: './schedule-admin.component.html',
  styleUrl: './schedule-admin.component.css'
})
export class ScheduleAdminComponent {
  employeeIds = ['12', '6', '5']; 
  scheduleData: Schedule[] = [];
dayShiftStartTime = '09:00 AM';
dayShiftEndTime = '05:00 PM';
nightShiftStartTime = '07:00 PM';
nightShiftEndTime = '03:00 AM';
  optionList: UserOption[] = [];
  time: Date | null = null;
  selectedUser: UserOption | null = null;
  apiData: any[] = [];
  isLoading = false;
  // calendarMode = NzCalendarMode;
  listOfOptionOfEmployee = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
  listOfSelectedEmployees: string[] = [];

  listOfOption = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  listOfSelectedValue: string[] = [];
  showForm: boolean = false;
  validateForm: FormGroup<{
    // selectedUser: FormControl<UserOption | null>,
    listOfSelectedEmployees: FormControl<string[]>,
    selectedDate: FormControl<[Date] | null>,
    day: FormControl<string>,
    shift: FormControl<string>,
    slotStarts:FormControl<[Date] | null>,
    slotEnds:FormControl<[Date] | null>
  }>

  ngOnInit(): void {
    this.apiClientService.getAllScheduleForRestaurant().subscribe(
      (data: any) => {
        console.log('API Response:', data);
        this.scheduleData = data.data;
        this.apiData = this.transformApiResponse(data.data);
        this.listDataMap = this.transformApiResponse(data.data);
        console.log('Modified Response:', this.apiData)
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

  private transformApiResponse(apiResponse: any[]): any[] {
    const transformedData: any = {};

    apiResponse.forEach(item => {
      const day = item.day.toLowerCase();
      const shiftType = item.shift.toLowerCase();
      const slotStart = new Date(item.slotStart);
      const slotEnds = new Date(item.slotEnds);
      const employeeIds = item.employees.map((employee:any) => JSON.parse(employee).id);

      const entry = {
        type: shiftType === 'day' ? 'success' : 'error',
        content: ` ID: ${employeeIds.join(',')}`
        // content: `${slotStart.toLocaleTimeString()} - ${slotEnds.toLocaleTimeString()} ID: ${employeeIds.join(',')}`
      };

      if (!transformedData[day]) {
        transformedData[day] = [entry];
      } else {
        transformedData[day].push(entry);
      }
    });

    return transformedData;
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
      listOfSelectedEmployees,
      slotStarts,
      slotEnds,
      day,
      shift
    } = this.validateForm.value;

    const mergedData = {
      employees: listOfSelectedEmployees,
      day,
      slotStart: slotStarts,
      slotEnds: slotEnds,
      shift
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

  listDataMap: any = {
    sunday: [
      { type: 'success', content:  "12 AM to 7AM ID: 1,2,3,7,8"  },
      { type: 'error', content: "ID: 3,4,5,10" }
    ],
    monday: [
      { type: 'success', content:  "ID: 1,2,3,7,8"  },
      { type: 'error', content: "ID: 3,4,5,10" }
    ],
    tuesday: [
      { type: 'success', content:  "ID: 1,2,3,7,8"  },
      { type: 'error', content: "ID: 3,4,5,10" }
    ],
    wednesday: [
      { type: 'success', content:  "ID: 1,2,3,7,8"  },
      { type: 'error', content: "ID: 3,4,5,10" }
    ],
    thursday: [
      { type: 'success', content:  "ID: 1,2,3,7,8"  },
      { type: 'error', content: "ID: 3,4,5,10" }
    ],
    friday: [
      { type: 'success', content:  "ID: 1,2,3,7,8"  },
      { type: 'error', content: "ID: 3,4,5,10" }
    ],
    saturday: [
      { type: 'success', content:  "ID: 1,2,3,7,8"  },
      { type: 'error', content: "ID: 3,4,5,10" }
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
      // selectedUser:this.fb.control<UserOption | null>(null),
      listOfSelectedEmployees: [[] as string[], [Validators.required]],
      selectedDate: this.fb.control<[Date] | null>(null),
      slotStarts: this.fb.control<[Date] | null>(null),
      slotEnds: this.fb.control<[Date] | null>(null),
      day: ['', [Validators.required]],
      shift: ['', [Validators.required]],
    })
  }
}
