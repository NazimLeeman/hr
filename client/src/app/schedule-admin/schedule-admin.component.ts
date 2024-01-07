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
    if (this.validateForm.valid) {
      const id = this.selectedUser;
      const { listOfSelectedValue, slotStarts, slotEnds } = this.validateForm.value;
      if (slotStarts && slotEnds && listOfSelectedValue ) {
      const slotStartsDate = slotStarts[0];
      const slotEndsDate = slotEnds[0];
        const userData = {
        employeeId: id,
        day: listOfSelectedValue[0], 
        slotStart: slotStartsDate.getHours(),
        slotEnds: slotEndsDate.getHours()
      };
      this.apiClientService.registerUser(userData).subscribe((response) => {
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

  

  log(value: Date): void {
    console.log(value);
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
