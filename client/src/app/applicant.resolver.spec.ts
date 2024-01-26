import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { applicantResolver } from './applicant.resolver';

describe('applicantResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => applicantResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
