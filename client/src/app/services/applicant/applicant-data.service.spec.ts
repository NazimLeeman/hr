import { TestBed } from '@angular/core/testing';

import { ApplicantDataService } from './applicant-data.service';

describe('ApplicantDataService', () => {
  let service: ApplicantDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicantDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
