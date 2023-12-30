import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css'
})
export class JobCardComponent {
 @Input() card: any;
 @Input() isSliced: boolean = true;



 toggleCardDetails(card: any): void {
  card.showDetails = !card.showDetails;
}
 
}
