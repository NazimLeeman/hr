import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './pages/applicant/sign-up/sign-up.component';
import { ApplicantLoginComponent } from './pages/applicant/applicant-login/applicant-login.component';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { DashboardComponent } from './pages/job/dashboard/dashboard.component';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';
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
import { authGuard } from './auth.guard';
import { DialogComponent } from './dialog/dialog.component';
import { PositionComponent } from './pages/admin/position/position.component';
import { ProfileLayoutComponent } from './pages/applicant/profile-layout/profile-layout.component';
import { GraphComponent } from './graph/graph.component';
import { AvailabilityComponent } from './pages/applicant/availability/availability.component';
import { AddressComponent } from './component/address/address.component';
import { TalentMarketComponent } from './talent-market/talent-market.component';
import { AuthRedirectComponent } from './pages/auth-redirect/auth-redirect.component';
import { MapComponent } from './map/map.component';
import { HubComponent } from './hub/hub.component';
import { LiveTrackingComponent } from './live-tracking/live-tracking.component';
import { PointsComponent } from './points/points.component';
import { SquareComponent } from './component/square/square.component';

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
      { path: 'payroll', component: PayrollComponent },
      { path: 'graph', component: GraphComponent}
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
      { path: 'settings/:applicantId', component: SettingsComponent, canActivate: [authGuard]  },
    ]
  },
  { path: 'address', component: AddressComponent},
  { path: 'jobs', component: TalentMarketComponent},
  { path: 'dashboard/:applicantId', component: DashboardComponent, canActivate: [authGuard]},
  { path: 'login', component: EmployeeLoginComponent},
  { path: 'success', component: SuccessDialogComponent},
  { path: 'map', component: MapComponent},
  { path: 'hub', component: HubComponent},
  { path: 'live', component: LiveTrackingComponent},
  { path: 'points', component: PointsComponent},
  { path: 'square', component: SquareComponent},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
