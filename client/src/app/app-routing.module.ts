import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ApplicantLoginComponent } from './applicant-login/applicant-login.component';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: ApplicantLoginComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'login', component: EmployeeLoginComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
