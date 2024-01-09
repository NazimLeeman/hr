import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css'
})
export class JobCardComponent {
 @Input() card: any;
 @Input() isSliced: boolean = true;
 isVisible = false;



 toggleCardDetails(card: any): void {
  card.showDetails = !card.showDetails;
}

showModal(): void {
  this.isVisible = true;
}

handleOk(): void {
  console.log('Button ok clicked!');
  this.isVisible = false;
}

handleCancel(): void {
  console.log('Button cancel clicked!');
  this.isVisible = false;
}
 
}
