import { FirebaseEmployerService } from './../_services/firebase-employer.service';
import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Users} from '../_models/index';
import {Client} from '../_models/index';
import {UsersService} from '../_services/index';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Employer } from '../_models/employer';

@Component({
    selector: 'app-register-client',
    templateUrl: './register-client.component.html',
    styleUrls: ['./register-client.component.css']
})
export class RegisterClientComponent implements OnInit {
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

    register() {
        this.user.username = this.client.username;
        this.user.password = this.client.password;
        this.user.userType = "client";
        this.company.companyName = this.client.companyName;
        
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
       this.employerService.registerEmployer(this.company, this.client.password);
       this.router.navigate(['/login']);
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
