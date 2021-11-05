import { Component, OnInit } from '@angular/core';
import { FirebaseEmployerService } from './../_services/firebase-employer.service';
import {Observable} from 'rxjs/Observable';
import {Users} from '../_models/index';
import {Client} from '../_models/index';
import {UsersService} from '../_services/index';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Employer } from '../_models/employer';
import { FormsModule, NgForm, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-gmail-register',
  templateUrl: './gmail-register.component.html',
  styleUrls: ['./gmail-register.component.scss']
})
export class GmailRegisterComponent implements OnInit {

  public employer : Employer;
  public formGroup : FormGroup;

    client: Client = new Client()
    user: Users = new Users()

    // Newly added Info
    company: Employer = new Employer()

    constructor(private userService: UsersService,
        private router: Router,
        private employerService: FirebaseEmployerService) { }

    ngOnInit() {
      this.company.email = localStorage.getItem('currentUserEmail');

      this.formGroup = new FormGroup({
        email: new FormControl(this.company.email, Validators.required),
        name: new FormControl(this.company.companyName, Validators.required),
        phone: new FormControl(this.company.phone, Validators.required),
        location: new FormControl(this.company.location, Validators.required) 
      });
    }

    newUser(): void {
        this.user = new Users();

        // Added Company Info
        this.company = new Employer();
    }

    register(form: NgForm) {
        this.user.username = form.value.username;
        this.user.password = "";
        this.user.userType = "client";
        this.company.email = localStorage.getItem('currentUserEmail');
        this.company.id = localStorage.getItem('currentUserID');
        this.company.companyName = form.value.name;
        this.company.phone = form.value.phone;
        this.company.location = form.value.location;
       
        this.employerService.registerGmailEmployer(this.company);
        localStorage.removeItem("currentUserEmail");
        this.router.navigate(['/employer-login']);
        console.log(this.company);
    }

    createAPI() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-<>";

      for (var i = 0; i < 25; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));

          return text;

      }
    }

  handleError(error: any): Promise<any> {
      alert("The same username already exists! Please choose another username.");
      console.error('Error occured at users.', error);
      return Promise.reject(error);
  }

}
