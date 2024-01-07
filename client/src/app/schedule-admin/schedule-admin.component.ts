import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiClientService } from '../api-client.service';

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
  isLoading = false;
  listOfOption = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  listOfSelectedValue: string[] = [];
  showForm: boolean = false;
  validateForm: FormGroup<{
    selectedUser: FormControl<UserOption | null>,
    listOfSelectedValue: FormControl<string[]>,
    slotStarts:FormControl<[Date] | null>,
    slotEnds:FormControl<[Date] | null>
  }>

  ngOnInit(): void {
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
      const selectedUser = this.validateForm.get('selectedUser');
    const listOfSelectedValue = this.validateForm.get('listOfSelectedValue');
    const slotStarts = this.validateForm.get('slotStarts');
    const slotEnds = this.validateForm.get('slotEnds');

    if (selectedUser && listOfSelectedValue ) {
      // const slotStartsDate: Date | null = slotStarts.value[0];
      // const slotEndsDate: Date | null = slotEnds.value[0];

      const userData = {
        employeeId: selectedUser.value?.id,
        day: listOfSelectedValue.value[0],
        // slotStart: slotStarts.value?.getHours() ?? null,
        // slotEnds: slotEnds.value?.getHours() ?? null,
      };
      console.log(userData);
      this.apiClientService.registerUser(userData).subscribe(
        (response) => {
          console.log('Schedule Posted successfully:', response);
        },
      (error) => {
        console.log("Error during resgistration", error)
      })
    }
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
      listOfSelectedValue,
    } = this.validateForm.value;

    const mergedData = {
      selectedUser,
      skillTags: listOfSelectedValue,
      slotStarts: slotStarts,
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

  constructor(private fb: NonNullableFormBuilder, private apiClientService: ApiClientService, private router: Router) {
    this.validateForm = this.fb.group({
      selectedUser:this.fb.control<UserOption | null>(null),
      slotStarts: this.fb.control<[Date] | null>(null),
      slotEnds: this.fb.control<[Date] | null>(null),
      listOfSelectedValue: [[] as string[], [Validators.required]]
    })
  }
}
