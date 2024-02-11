import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.css'
})
export class CustomButtonComponent implements OnInit {
  @Input() buttonText: string = '';
  @Input() backgroundColor: string = '';
  @Output() buttonClick: EventEmitter<any> = new EventEmitter();

  buttonStyle: any = {};

  constructor() { }

  ngOnInit(): void {
    this.buttonStyle = {
      'background-color': this.backgroundColor,
      // Add other common styles here
    };
  }

  handleClick(): void {
    this.buttonClick.emit();
  }

  changeBackgroundColor(isMouseOver: boolean): void {
    this.buttonStyle['background-color'] = isMouseOver ? '#38a169' : this.backgroundColor;
  }
}
