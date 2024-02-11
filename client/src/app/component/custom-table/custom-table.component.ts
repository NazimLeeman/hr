import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.css'
})
export class CustomTableComponent {
   @Input() title: string = '';
  @Input() headers: string[] = [];
  @Input() data: any[] = [];
   pageIndex: number = 1;
   pageSize: number = 6;
  @Output() pageIndexChange: EventEmitter<number> = new EventEmitter<number>();

  showSuccess = true;

  // handlePageIndexChange(page: number): void {
  //   this.pageIndexChange.emit(page);
  // }
  handlePageIndexChange(pageSize: number): void {
    this.pageIndex = pageSize;
  }
}
