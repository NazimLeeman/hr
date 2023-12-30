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

const routes: Routes = [
  { path: '', component: ApplicantLoginComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'profile', component: RegistrationSummaryComponent },
  // { path: 'profile', component: ProfileComponent },
  { path: 'experience', component: ExperienceComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'applications', component: ApplicationsComponent },
  { path: 'settings', component: SettingsComponent },
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
