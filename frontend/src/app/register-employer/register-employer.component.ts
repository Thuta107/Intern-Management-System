import { Component, OnInit } from '@angular/core';
import { FirebaseEmployerService } from './../_services/firebase-employer.service';
import {FormsModule, NgForm} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Users} from '../_models/index';
import {Client} from '../_models/index';
import {UsersService} from '../_services/index';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Employer } from '../_models/employer';

@Component({
  selector: 'app-register-employer',
  templateUrl: './register-employer.component.html',
  styleUrls: ['./register-employer.component.scss']
})

export class RegisterEmployerComponent implements OnInit {

    client: Client = new Client()
    user: Users = new Users()

    // Newly added Info
    company: Employer = new Employer()

    constructor(private userService: UsersService,
        private router: Router,
        private employerService: FirebaseEmployerService) { }

    ngOnInit() {
    }

    newUser(): void {
        this.user = new Users();
        this.client = new Client();

        // Added Company Info
        this.company = new Employer();
    }

    register(form: NgForm) {
        this.user.username = form.value.username;
        this.user.password = form.value.registerPassword;
        this.user.userType = "client";
        this.company.companyName = form.value.companyName;
        this.company.email = form.value.email;
        this.company.phone = form.value.phone;
        this.company.location = form.value.address;
         
        /*
        this.user.apiKey = this.createAPI();
        
        (this.userService.createUser(this.user)).subscribe(response => {
             if (response.success == 0) {
                 throw Observable.throw(response);
             } else {
                 this.router.navigate(['/login']);
             }
             this.router.navigate(['/login']);
         });
        */ 
       
       this.employerService.registerEmployer(this.company, this.user.password);
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
      //localStorage.setItem('Error', 'true');
      alert("The same username already exists! Please choose another username.");
      console.error('Error occured at users.', error);
      return Promise.reject(error);
  }

}
