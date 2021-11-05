import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { GmailRegisterComponent } from "./gmail-register/gmail-register.component";
import { RegisterEmployerComponent } from "./register-employer/register-employer.component";
import { EmployerJobFormComponent } from "./employer-app/employer-jobform/employer-jobform.component";

import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { RegisterUserComponent } from "./register-user/register-user.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { UserComponent } from "./user/user.component";
import { TopItemsComponent } from "./top-items/top-items.component";
import { MyScheduleComponent } from "./my-schedule/my-schedule.component";
import { RegisterClientComponent } from "./register-client/register-client.component";
import { UserInterestsComponent } from "./user-interests/user-interests.component";
import { ClientSolutionsComponent } from "./client-solutions/client-solutions.component";
import { PortalOutlineComponent } from "./portal-outline/portal-outline.component";
import { GenerateApiClientComponent } from "./generate-api-client/generate-api-client.component";
import { GenerateApiUserComponent } from "./generate-api-user/generate-api-user.component";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { UserSolutionsComponent } from "./user-solutions/user-solutions.component";
import { FormUploadComponent } from "./form-upload/form-upload.component";
import { ResearchComponent } from "./research/research.component";
import { GateBookingComponent } from "./gate-booking/gate-booking.component";
import { BankdashboardComponent } from "./bankdashboard/bankdashboard.component";
import { TransactionComponent } from "./transaction/transaction.component";
import { SearchlistComponent } from "./searchlist/searchlist.component";
import { MyApplicationsComponent } from "./my-applications/my-applications.component";
import { TestComponent } from "./test/test.component";

import { AuthGuard } from "./_guards/index";
import { RoleGuard } from "./_guards/index";
import { EmployerLoginComponent } from "./employer-app/employer-login/employer-login.component";
import { EmployerHomeComponent } from "./employer-app/employer-home/employer-home.component";
import { EmployerCompanyformComponent } from "./employer-app/employer-companyform/employer-companyform.component";
import { EmployerJoblistComponent } from "./employer-app/employer-joblist/employer-joblist.component";
import { EmployerApplicationComponent } from "./employer-app/employer-application/employer-application.component";
import { ViewStudentComponent } from "./employer-app/employer-view-student/employer-view-student.component";

import { EmployerListComponent } from "./coordinator-app/employer-list/employer-list.component";
import { CoordInternshipListComponent } from "./coordinator-app/coord-internship-list/coord-internship-list.component";
import { CoordinatorLoginComponent } from "./coordinator-app/coordinator-login/coordinator-login.component";
import { CoordinatorDashboardComponent } from "./coordinator-app/coordinator-dashboard/coordinator-dashboard.component";
import { EmployerDetailsComponent } from "./coordinator-app/employer-details/employer-details.component";
import { CoordinatorStudentComponent } from "./coordinator-app/coordinator-student/coordinator-student.component";
import { CoordinatorStudentlistComponent } from "./coordinator-app/coordinator-studentlist/coordinator-studentlist.component";
import { InternshipDocViewerComponent } from "./coordinator-app/internship-doc-viewer/internship-doc-viewer.component";
import { CoordStudentListComponent } from "./coordinator-app/coord-student-list/coord-student-list.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard],

    children: [
      {
        path: "about-us",
        component: AboutUsComponent
      },

      {
        path: "contact-us",
        component: ContactUsComponent
      },

      {
        path: "my-schedule",
        component: MyScheduleComponent,
        canActivate: [RoleGuard],
        data: { userType: "customer" }
      },

      {
        path: "user-interests",
        component: UserInterestsComponent,
        canActivate: [RoleGuard],
        data: { userType: "customer" }
      },

      {
        path: "client-solutions",
        component: ClientSolutionsComponent,
        canActivate: [RoleGuard],
        data: { userType: "client" }
      },

      {
        path: "generate-api-client",
        component: GenerateApiClientComponent,
        canActivate: [RoleGuard],
        data: { userType: "client" }
      },

      {
        path: "generate-api-user",
        component: GenerateApiUserComponent,
        canActivate: [RoleGuard],
        data: { userType: "customer" }
      },

      {
        path: "user-details",
        component: UserDetailsComponent,
        canActivate: [RoleGuard],
        data: { userType: "admin" }
      },

      {
        path: "user-solutions",
        component: UserSolutionsComponent,
        canActivate: [RoleGuard],
        data: { userType: "customer" }
      },

      {
        path: "form-upload",
        component: FormUploadComponent,
        canActivate: [RoleGuard],
        data: { userType: "admin" }
      },

      {
        path: "research",
        component: ResearchComponent,
        canActivate: [RoleGuard],
        data: { userType: "customer" }
      },

      {
        path: "gate-booking",
        component: GateBookingComponent,
        canActivate: [RoleGuard],
        data: { userType: "customer" }
      },

      {
        path: "transaction",
        component: TransactionComponent,
        canActivate: [RoleGuard],
        data: { userType: "customer" }
      },

      {
        path: "bankdashboard",
        component: BankdashboardComponent,
        canActivate: [RoleGuard],
        data: { userType: "customer" }
      },

      //////////// employer ///////////////////
      {
        path: "employer-jobform",
        component: EmployerJobFormComponent,
        canActivate: [RoleGuard],
        data: { userType: "client" }
      },

      {
        path: "employer-companyform",
        component: EmployerCompanyformComponent,
        canActivate: [RoleGuard],
        data: { userType: "client" }
      },

      {
        path: "employer-joblist",
        component: EmployerJoblistComponent,
        canActivate: [RoleGuard],
        data: { userType: "client" }
      },

      {
        path: "employer-application",
        component: EmployerApplicationComponent,
        canActivate: [RoleGuard],
        data: { userType: "client" }
      },

      {
        path: "employer-view-student",
        component: ViewStudentComponent,
        canActivate: [RoleGuard],
        data: { userType: "client" }
      },

      { path: "user", component: UserComponent },
      { path: "top-items", component: TopItemsComponent },
      {
        path: "about-us",
        component: AboutUsComponent,
        canActivate: [AuthGuard]
      },

      {
        path: "searchlist",
        component: SearchlistComponent,
        canActivate: [AuthGuard],
        data: { userType: "customer" }
      },

      {
        path: "my-applications",
        component: MyApplicationsComponent,
        canActivate: [AuthGuard],
        data: { userType: "admin" }
      }
    ]
  },

  // For the Employer Dashboard
  { path: "employer-login", component: EmployerLoginComponent },
  {
    path: "employer",
    component: EmployerHomeComponent,
    canActivate: [AuthGuard],

    children: [
      {
        path: "employer-jobform",
        component: EmployerJobFormComponent,
        canActivate: [RoleGuard],
        data: { userType: "client" }
      },

      {
        path: "employer-companyform",
        component: EmployerCompanyformComponent,
        canActivate: [RoleGuard],
        data: { userType: "client" }
      },

      {
        path: "employer-joblist",
        component: EmployerJoblistComponent,
        canActivate: [RoleGuard],
        data: { userType: "client" }
      },

      {
        path: "employer-application",
        component: EmployerApplicationComponent,
        canActivate: [RoleGuard],
        data: { userType: "client" }
      },

      {
        path: "employer-view-student",
        component: ViewStudentComponent,
        canActivate: [RoleGuard],
        data: { userType: "client" }
      }
    ]
  },
  //

  {
    path: "coordinator/employerlist",
    component: EmployerListComponent
  },
  {
    path: "coordinator/student",
    component: CoordinatorStudentComponent
  },
  {
    path: "coordinator/internshiplist",
    component: CoordInternshipListComponent
  },
  {
    path: "coordinator/login",
    component: CoordinatorLoginComponent
  },
  {
    path: "coordinator/dashboard",
    component: CoordinatorDashboardComponent
  },
  {
    path: "coordinator/employer-details",
    component: EmployerDetailsComponent
  },
  {
    path: "coordinator/student-list",
    component: CoordinatorStudentlistComponent
  },
  {
    path: "coordinator/student-info",
    component: CoordStudentListComponent
  },
  {
    path: "coordinator/internshipdocs",
    component: InternshipDocViewerComponent
  },
  { path: "login", component: LoginComponent },
  { path: "register-user", component: RegisterUserComponent },
  { path: "register-client", component: RegisterClientComponent },
  { path: "register-employer", component: RegisterEmployerComponent },
  { path: "gmail-register", component: GmailRegisterComponent },

  // otherwise redirect to home
  { path: "**", redirectTo: "" }
];

export const routing = RouterModule.forRoot(routes);
