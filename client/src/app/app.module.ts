import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { en_US, NZ_I18N  } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IconsProviderModule } from './icons-provider.module';
import en from '@angular/common/locales/en';
import { GoogleMapsModule } from '@angular/google-maps';

//Component
import { AppComponent } from './app.component';
import { DialogComponent } from './component/dialog/dialog.component';
import { ApplicantLoginComponent } from './pages/applicant/applicant-login/applicant-login.component';
import { SignUpComponent } from './pages/applicant/sign-up/sign-up.component';
import { LoginFormComponent } from './component/login-form/login-form.component';
import { DashboardComponent } from './pages/job/dashboard/dashboard.component';
import { JobCardComponent } from './component/job-card/job-card.component';
import { RegistrationSummaryComponent } from './pages/applicant/registration-summary/registration-summary.component';
import { ExperienceComponent } from './pages/applicant/experience/experience.component';
import { SkillsComponent } from './pages/applicant/skills/skills.component';
import { ApplicationsComponent } from './pages/applicant/applications/applications.component';
import { SettingsComponent } from './pages/applicant/settings/settings.component';
import { AdminSummaryComponent } from './pages/admin/admin-summary/admin-summary.component';
import { PostJobComponent } from './pages/admin/post-job/post-job.component';
import { NavbarAdminComponent } from './component/navbar-admin/navbar-admin.component';
import { CreateEmployeeComponent } from './pages/admin/create-employee/create-employee.component';
import { ScheduleAdminComponent } from './pages/admin/schedule-admin/schedule-admin.component';
import { ApplicantTrackingComponent } from './pages/admin/applicant-tracking/applicant-tracking.component';
import { PayrollComponent } from './pages/admin/payroll/payroll.component';
import { AdminProfileComponent } from './pages/admin/admin-profile/admin-profile.component';
import { PositionComponent } from './pages/admin/position/position.component';
import { ProfileLayoutComponent } from './pages/applicant/profile-layout/profile-layout.component';
import { AvailabilityComponent } from './pages/applicant/availability/availability.component';
import { AddressComponent } from './component/address/address.component';
import { AuthRedirectComponent } from './pages/auth-redirect/auth-redirect.component';
import { SpashLogoComponent } from './component/spash-logo/spash-logo.component';
import { CustomButtonComponent } from './component/custom-button/custom-button.component';
import { ProfileDetailsComponent } from './component/profile-details/profile-details.component';

//Ng-Zorro
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzResultModule } from 'ng-zorro-antd/result';
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NgChartsModule } from 'ng2-charts';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

//Interceptor
import { AuthInterceptor } from './interceptors/auth/auth.service';
import { TokenInterceptor } from './interceptors/token/token.service';

registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent,
    ApplicantLoginComponent,
    SignUpComponent,
    LoginFormComponent,
    DashboardComponent,
    JobCardComponent,
    RegistrationSummaryComponent,
    ExperienceComponent,
    SkillsComponent,
    ApplicationsComponent,
    SettingsComponent,
    AdminSummaryComponent,
    PostJobComponent,
    NavbarAdminComponent,
    CreateEmployeeComponent,
    ScheduleAdminComponent,
    ApplicantTrackingComponent,
    PayrollComponent,
    DialogComponent,
    AdminProfileComponent,
    PositionComponent,
    ProfileLayoutComponent,
    AvailabilityComponent,
    AddressComponent,
    AuthRedirectComponent,
    SpashLogoComponent,
    ProfileDetailsComponent,
    CustomButtonComponent
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
    NzDividerModule,
    NzDropDownModule,
    NzSpinModule,
    NzTimePickerModule,
    NzModalModule,
    NzTagModule,
    NzCalendarModule,
    NzAlertModule,
    NzBadgeModule,
    NgChartsModule,
    NzSkeletonModule,
    NzRadioModule,
    NzPaginationModule,
    NzDrawerModule,
    GoogleMapsModule,
    NzPopconfirmModule,
    NzCheckboxModule,
    NzSliderModule,
    NzInputNumberModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
