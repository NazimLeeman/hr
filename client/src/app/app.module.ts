import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
// import en from '@angular/common/locales/en';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { ApplicantLoginComponent } from './applicant-login/applicant-login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';
import { JobCardComponent } from './job-card/job-card.component';
import { RegistrationSummaryComponent } from './registration-summary/registration-summary.component';
import { ExperienceComponent } from './experience/experience.component';
import { SkillsComponent } from './skills/skills.component';
import { ApplicationsComponent } from './applications/applications.component';
import { SettingsComponent } from './settings/settings.component';
import { NavbarProfileComponent } from './navbar-profile/navbar-profile.component';
import { AdminSummaryComponent } from './admin-summary/admin-summary.component';
import { PostJobComponent } from './post-job/post-job.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ScheduleAdminComponent } from './schedule-admin/schedule-admin.component';
import { ApplicantTrackingComponent } from './applicant-tracking/applicant-tracking.component';
import { PayrollComponent } from './payroll/payroll.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { IconsProviderModule } from './icons-provider.module';
import { NzResultModule } from 'ng-zorro-antd/result';
import { DialogComponent } from './dialog/dialog.component';
import en from '@angular/common/locales/en';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';

registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent,
    EmployeeLoginComponent,
    ApplicantLoginComponent,
    SignUpComponent,
    LoginFormComponent,
    DashboardComponent,
    SuccessDialogComponent,
    JobCardComponent,
    RegistrationSummaryComponent,
    ExperienceComponent,
    SkillsComponent,
    ApplicationsComponent,
    SettingsComponent,
    NavbarProfileComponent,
    AdminSummaryComponent,
    PostJobComponent,
    NavbarAdminComponent,
    CreateEmployeeComponent,
    ScheduleAdminComponent,
    ApplicantTrackingComponent,
    PayrollComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzUploadModule,
    NzSelectModule,
    NzIconModule,
    NzNotificationModule,
    NzBreadCrumbModule,
    NzLayoutModule,
    NzMenuModule,
    IconsProviderModule,
    NzResultModule,
    NzDatePickerModule,
    NzDescriptionsModule,
    NzTableModule,
    NzDividerModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
