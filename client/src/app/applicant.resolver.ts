import { ResolveFn } from '@angular/router';

export const applicantResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
