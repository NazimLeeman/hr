import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './pages/applicant/sign-up/sign-up.component';
import { ApplicantLoginComponent } from './pages/applicant/applicant-login/applicant-login.component';
import { DashboardComponent } from './pages/job/dashboard/dashboard.component';
import { RegistrationSummaryComponent } from './pages/applicant/registration-summary/registration-summary.component';
import { ApplicationsComponent } from './pages/applicant/applications/applications.component';
import { ExperienceComponent } from './pages/applicant/experience/experience.component';
import { SettingsComponent } from './pages/applicant/settings/settings.component';
import { SkillsComponent } from './pages/applicant/skills/skills.component';
import { AdminSummaryComponent } from './pages/admin/admin-summary/admin-summary.component';
import { PostJobComponent } from './pages/admin/post-job/post-job.component';
import { CreateEmployeeComponent } from './pages/admin/create-employee/create-employee.component';
import { ScheduleAdminComponent } from './pages/admin/schedule-admin/schedule-admin.component';
import { ApplicantTrackingComponent } from './pages/admin/applicant-tracking/applicant-tracking.component';
import { PayrollComponent } from './pages/admin/payroll/payroll.component';
import { authGuard } from './services/guard/auth.guard';
import { DialogComponent } from './component/dialog/dialog.component';
import { PositionComponent } from './pages/admin/position/position.component';
import { ProfileLayoutComponent } from './pages/applicant/profile-layout/profile-layout.component';
import { AvailabilityComponent } from './pages/applicant/availability/availability.component';
import { AddressComponent } from './component/address/address.component';
import { AuthRedirectComponent } from './pages/auth-redirect/auth-redirect.component';

const routes: Routes = [
  { path: '', component: ApplicantLoginComponent },
  { path: 'auth-redirect', component: AuthRedirectComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'successful', component: DialogComponent},
  {
    path: 'admin',
    component: AdminSummaryComponent,
    children: [
      { path: 'createEmployee', component: CreateEmployeeComponent },
      {path: 'position/:employeeId', component: PositionComponent},
      { path: 'createSchedule', component: ScheduleAdminComponent },
      { path: 'jobs', component: PostJobComponent },
      { path: 'applicant', component: ApplicantTrackingComponent },
      { path: 'payroll', component: PayrollComponent }
    ],
  },
  { 
    path: 'applicant/:applicantId',
    component: ProfileLayoutComponent,
    canActivate: [authGuard] ,
    children: [
      { path: 'profile/:applicantId', component: RegistrationSummaryComponent, canActivate: [authGuard] },
      { path: 'experience/:applicantId', component: ExperienceComponent, canActivate: [authGuard]  },
      { path: 'skills/:applicantId', component: SkillsComponent, canActivate: [authGuard]  },
      { path: 'applications/:applicantId', component: ApplicationsComponent, canActivate: [authGuard]  },
      { path: 'availability/:applicantId', component: AvailabilityComponent, canActivate: [authGuard]  },
      { path: 'settings/:applicantId', component: SettingsComponent, canActivate: [authGuard]  }
    ]
  },
  { path: 'address', component: AddressComponent},
  { path: 'dashboard/:applicantId', component: DashboardComponent, canActivate: [authGuard]},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
