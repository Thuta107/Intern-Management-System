import { EmployerHomeComponent } from "./employer-app/employer-home/employer-home.component";
import { EmployerJobFormComponent } from "./employer-app/employer-jobform/employer-jobform.component";

import { BrowserModule } from "@angular/platform-browser";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { MDBBootstrapModule } from "angular-bootstrap-md";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";

import { Users, userDetails } from "./_models/index";

import {
  UsersService,
  AuthenticationService,
  UploadFileService,
  userDetailsService
} from "./_services/index";
import { AuthGuard, RoleGuard } from "./_guards/index";
import { RegisterUserComponent } from "./register-user/register-user.component";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";

import { routing } from "./app.routing";
import { FormUploadComponent } from "./form-upload/form-upload.component";
import { DetailsUploadComponent } from "./details-upload/details-upload.component";

import { UserComponent } from "./user/user.component";
import { TopItemsComponent } from "./top-items/top-items.component";
import { RegisterClientComponent } from "./register-client/register-client.component";
import { MyScheduleComponent } from "./my-schedule/my-schedule.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CalendarModule } from "angular-calendar";
import "flatpickr/dist/flatpickr.css";

import { CommonModule } from "@angular/common";

import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap/modal/modal.module";
import { FlatpickrModule } from "angularx-flatpickr";
import { UserMedicationComponent } from "./user-medication/user-medication.component";

import { ModalComponent } from "./_directives";
import { ModalService } from "./_services";

import { MatTableModule } from "@angular/material";

// import { AppRoutingModule} from "./app-routing.module";

import {
  MatCardModule,
  MatIconModule,
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatGridListModule
} from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { UserInterestsComponent } from "./user-interests/user-interests.component";
import { AddUserInterestDialogComponent } from "./add-user-interest-dialog/add-user-interest-dialog.component";
import { ClientSolutionsComponent } from "./client-solutions/client-solutions.component";
import { PortalOutlineComponent } from "./portal-outline/portal-outline.component";
import { GenerateApiClientComponent } from "./generate-api-client/generate-api-client.component";
import { GenerateApiUserComponent } from "./generate-api-user/generate-api-user.component";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { SuccessComponent } from "./success/success.component";
import { UserSolutionsComponent } from "./user-solutions/user-solutions.component";
import { ErrorComponent } from "./error/error.component";
import { ResearchComponent } from "./research/research.component";
import { GateBookingComponent } from "./gate-booking/gate-booking.component";
import { BankdashboardComponent } from "./bankdashboard/bankdashboard.component";
import { TransactionComponent } from "./transaction/transaction.component";
import { MatMenuModule } from "@angular/material/menu";

// import { AngularFireModule } from '@angular/fire';
// import {AngularFireDatabaseModule} from '@angular/fire/database';
// import {AngularFireAuthModule} from '@angular/fire/auth';

import { environment } from "../environments/environment";
import { TestComponent } from "./test/test.component";
import { ListUploadComponent } from "./list-upload/list-upload.component";
import { SearchlistComponent } from "./searchlist/searchlist.component";
import { MyApplicationsComponent } from "./my-applications/my-applications.component";
import { EmployerLoginComponent } from "./employer-app/employer-login/employer-login.component";
import { EmployerJoblistComponent } from "./employer-app/employer-joblist/employer-joblist.component";
import { EmployerApplicationComponent } from "./employer-app/employer-application/employer-application.component";
import { ViewStudentComponent } from "./employer-app/employer-view-student/employer-view-student.component";
import { EmployerCompanyformComponent } from "./employer-app/employer-companyform/employer-companyform.component";
import { EmployerDashboardComponent } from "./employer-app/employer-dashboard/employer-dashboard.component";
import { EmployerListComponent } from "./coordinator-app/employer-list/employer-list.component";
import { RegisterEmployerComponent } from "./register-employer/register-employer.component";
import { CoordInternshipListComponent } from "./coordinator-app/coord-internship-list/coord-internship-list.component";
import { CoordinatorLoginComponent } from "./coordinator-app/coordinator-login/coordinator-login.component";
import { NavBarComponent } from "./coordinator-app/nav-bar/nav-bar.component";
import { CoordinatorDashboardComponent } from "./coordinator-app/coordinator-dashboard/coordinator-dashboard.component";
import { GmailRegisterComponent } from "./gmail-register/gmail-register.component";
import { MonthlyReportsComponent } from "./monthly-reports/monthly-reports.component";
import { ProfileComponent } from "./profile/profile.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { EmployerTableComponent } from "./coordinator-app/employer-table/employer-table.component";
import { EmployerDetailsComponent } from "./coordinator-app/employer-details/employer-details.component";
import { CoordinatorStudentComponent } from "./coordinator-app/coordinator-student/coordinator-student.component";
import { CoordinatorStudentlistComponent } from "./coordinator-app/coordinator-studentlist/coordinator-studentlist.component";
import { InternshipDocViewerComponent } from "./coordinator-app/internship-doc-viewer/internship-doc-viewer.component";
import { CoordStudentListComponent } from "./coordinator-app/coord-student-list/coord-student-list.component";

@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponent,
    DashboardComponent,
    AboutUsComponent,
    ContactUsComponent,
    LoginComponent,
    HomeComponent,
    FormUploadComponent,
    DetailsUploadComponent,
    UserComponent,
    TopItemsComponent,
    RegisterClientComponent,
    MyScheduleComponent,
    UserMedicationComponent,
    ModalComponent,
    UserInterestsComponent,
    AddUserInterestDialogComponent,
    ClientSolutionsComponent,
    PortalOutlineComponent,
    GenerateApiClientComponent,
    GenerateApiUserComponent,
    UserDetailsComponent,
    SuccessComponent,
    UserSolutionsComponent,
    ErrorComponent,
    ResearchComponent,
    GateBookingComponent,
    BankdashboardComponent,
    TransactionComponent,
    TestComponent,
    EmployerJobFormComponent,
    EmployerCompanyformComponent,
    ListUploadComponent,
    SearchlistComponent,
    MyApplicationsComponent,
    EmployerLoginComponent,
    EmployerHomeComponent,
    EmployerJoblistComponent,
    EmployerApplicationComponent,
    ViewStudentComponent,
    EmployerJobFormComponent,
    EmployerCompanyformComponent,
    EmployerDashboardComponent,
    EmployerListComponent,
    RegisterEmployerComponent,
    CoordInternshipListComponent,
    CoordinatorLoginComponent,
    NavBarComponent,
    CoordinatorDashboardComponent,
    GmailRegisterComponent,
    CoordinatorDashboardComponent,
    MonthlyReportsComponent,
    ProfileComponent,
    EmployerTableComponent,
    EmployerDetailsComponent,
    CoordinatorStudentComponent,
    CoordinatorStudentlistComponent,
    InternshipDocViewerComponent,
    CoordStudentListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    routing,
    BrowserAnimationsModule,
    CommonModule,
    FlatpickrModule.forRoot(),
    NgbModalModule.forRoot(),
    CalendarModule.forRoot(),
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatMenuModule,
    MDBBootstrapModule.forRoot()
    // AppRoutingModule
    //AngularFireModule.initializeApp(environment.firebase),
    //AngularFireDatabaseModule,
    //AngularFireAuthModule,
  ],

  exports: [MatTableModule],

  schemas: [NO_ERRORS_SCHEMA],

  providers: [
    UsersService,
    userDetailsService,
    userDetails,
    Users,
    AuthenticationService,
    AuthGuard,
    RoleGuard,
    UploadFileService,
    ModalService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddUserInterestDialogComponent,
    SuccessComponent,
    ErrorComponent
  ]
})
export class AppModule {}
