import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentMarketComponent } from './talent-market.component';

describe('TalentMarketComponent', () => {
  let component: TalentMarketComponent;
  let fixture: ComponentFixture<TalentMarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TalentMarketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TalentMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
