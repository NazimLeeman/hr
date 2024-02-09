import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantTrackingComponent } from './applicant-tracking.component';

describe('ApplicantTrackingComponent', () => {
  let component: ApplicantTrackingComponent;
  let fixture: ComponentFixture<ApplicantTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicantTrackingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicantTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
