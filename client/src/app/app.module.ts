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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { PositionComponent } from './position/position.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NgChartsModule } from 'ng2-charts';
import { GraphComponent } from './graph/graph.component';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { AvailabilityComponent } from './availability/availability.component';
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { AddressComponent } from './address/address.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { TalentMarketComponent } from './talent-market/talent-market.component';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { AuthRedirectComponent } from './auth-redirect/auth-redirect.component';
import { SpashLogoComponent } from './spash-logo/spash-logo.component';
import { AuthInterceptor } from './interceptors/auth/auth.service';
import { TokenInterceptor } from './interceptors/token/token.service';
import { MapComponent } from './map/map.component';
import { ProfileDetailsComponent } from './component/profile-details/profile-details.component';
import { HubComponent } from './hub/hub.component';
import { LiveTrackingComponent } from './live-tracking/live-tracking.component';
import { PointsComponent } from './points/points.component';

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
    DialogComponent,
    AdminProfileComponent,
    PositionComponent,
    ProfileLayoutComponent,
    GraphComponent,
    AvailabilityComponent,
    BarChartComponent,
    AddressComponent,
    TalentMarketComponent,
    AuthRedirectComponent,
    SpashLogoComponent,
    MapComponent,
    ProfileDetailsComponent,
    HubComponent,
    LiveTrackingComponent,
    PointsComponent
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
