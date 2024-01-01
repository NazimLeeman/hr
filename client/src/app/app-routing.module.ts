import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ApplicantLoginComponent } from './applicant-login/applicant-login.component';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';
import { RegistrationSummaryComponent } from './registration-summary/registration-summary.component';
import { ApplicationsComponent } from './applications/applications.component';
import { ExperienceComponent } from './experience/experience.component';
import { SettingsComponent } from './settings/settings.component';
import { SkillsComponent } from './skills/skills.component';
import { AdminSummaryComponent } from './admin-summary/admin-summary.component';
import { PostJobComponent } from './post-job/post-job.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ScheduleAdminComponent } from './schedule-admin/schedule-admin.component';
import { ApplicantTrackingComponent } from './applicant-tracking/applicant-tracking.component';
import { PayrollComponent } from './payroll/payroll.component';

const routes: Routes = [
  { path: '', component: ApplicantLoginComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'profile/:applicantId', component: RegistrationSummaryComponent },
  { path: 'admin', component: AdminSummaryComponent },
  { path: 'createEmployee', component: CreateEmployeeComponent},
  { path: 'createSchedule', component: ScheduleAdminComponent},
  { path: 'jobs', component: PostJobComponent },
  { path: 'applicant', component: ApplicantTrackingComponent },
  { path: 'payroll', component: PayrollComponent },
  // { path: 'profile', component: ProfileComponent },
  { path: 'experience/:applicantId', component: ExperienceComponent },
  { path: 'skills/:applicantId', component: SkillsComponent },
  { path: 'applications/:applicantId', component: ApplicationsComponent },
  { path: 'settings/:applicantId', component: SettingsComponent },
  { path: 'login', component: EmployeeLoginComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'success', component: SuccessDialogComponent},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
