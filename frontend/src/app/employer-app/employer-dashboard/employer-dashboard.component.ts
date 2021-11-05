import { AuthenticationService } from './../../_services/authentication.service';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import * as firebase from 'firebase'
//import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-employer-dashboard',
  templateUrl: './employer-dashboard.component.html',
  styleUrls: ['./employer-dashboard.component.css']
})
export class EmployerDashboardComponent implements OnInit {

  client: boolean = false;
  admin: boolean = false;
  customer: boolean = false;
  private database : firebase.database.Database;

  constructor(private router: Router,
      private route: ActivatedRoute,
      public AuthenticationService: AuthenticationService) {
      this.database = firebase.database();
   }

  ngOnInit() {
  }

  ngDoCheck() {

  }

  redirectHome() {
      this.router.navigateByUrl('employer');
  }
  
  // Added Post Job Form
  redirectJobForm(){
      this.router.navigateByUrl('employer/employer-jobform');
  }

  // Added Company Form
  redirectCompanyForm(){
      this.router.navigateByUrl('employer/employer-companyform');
  }

  redirectAllPostedJobs() {
      this.router.navigateByUrl('employer/employer-joblist');
  }

  redirectStudentDetails() {
      this.router.navigateByUrl('employer/employer-view-student');
  }
  
  logout() {
      localStorage.removeItem('internshipId');
      localStorage.removeItem('internshipName');
      localStorage.removeItem('internshipSeats');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('currentUserID');
      localStorage.removeItem('currentUserType');
      localStorage.removeItem('apiKey');
      this.router.navigate(['employer-login']);
  }

}