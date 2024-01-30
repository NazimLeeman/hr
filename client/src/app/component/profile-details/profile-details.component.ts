import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.css'
})
export class ProfileDetailsComponent {
    @Input() label: string | undefined;
    @Input() value: string | undefined;
    @Input() type: string = 'text';

  constructor() { }
}
