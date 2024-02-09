import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSummaryComponent } from './admin-summary.component';

describe('AdminSummaryComponent', () => {
  let component: AdminSummaryComponent;
  let fixture: ComponentFixture<AdminSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
