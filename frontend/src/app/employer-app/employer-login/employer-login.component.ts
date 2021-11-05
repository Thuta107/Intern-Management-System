import { AuthenticationService } from './../../_services/authentication.service';
import { Users } from './../../_models/users';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseEmployerService } from './../../_services/firebase-employer.service';

@Component({
  selector: 'app-employer-login',
  templateUrl: './employer-login.component.html',
  styleUrls: ['./employer-login.component.css']
})
export class EmployerLoginComponent implements OnInit {

  user: Users = new Users()

  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private employerService: FirebaseEmployerService) { }

  ngOnInit() {
  }

  newUser(): void {
    this.user = new Users();
}

login() {
    console.log(this.user);
    console.log(" router "  + this.router);
    this.authenticationService.employerLogin(this.user);    
}

loginEmail(){
  this.employerService.getEmployerEmail(this.user.username, returnValue => {
    if (returnValue === true){
      this.authenticationService.employerLoginEmail(this.user.username, this.user.password);
    } else {
      alert('No matching email');
    }
  });
}

private handleError(error: any): Promise<any> {
    alert("Incorrect Username or Password.");
    console.error('Error occured at users.', error);
    return Promise.reject(error);
}

redirectNewEmployer() {
    this.router.navigate(['/register-employer']);
}

//Testing
redirectEmployerDashboard(){
    this.router.navigate(["employer/employer-joblist"]);
}
}
