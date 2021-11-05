import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import * as firebase from "firebase";
import { FirebaseService } from "./../../_services/firebase.service";
import { AuthenticationService } from "./../../_services/authentication.service";
import { Users } from "../../_models/users";

@Component({
  selector: "app-coordinator-login",
  templateUrl: "./coordinator-login.component.html",
  styleUrls: ["./coordinator-login.component.scss"]
})
export class CoordinatorLoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;
  coord: Users = new Users();

  constructor(
    private authenticationService: AuthenticationService,
    private firebaseService: FirebaseService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  login() {
    this.coord.email = this.loginForm.value.email;
    this.coord.password = this.loginForm.value.password;
    console.log(this.loginForm.value);
    console.log(this.coord);
    //this.firebaseService.newCoordinator();
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    //this.authenticationService.login(this.loginForm.value); //just added
    //this.authenticationService.coordLoginEmail(this.coord); //just added
    var a = this.firebaseService.searchCoord(
      this.coord,
      this.loginForm.value.email,
      this.loginForm.value.password
    ); //new changes
    console.log(a);
    if (a==false) {
      //this.router.navigate(['/register-user']);
      console.log("redirecting");
      this.router.navigate(["register-user"]);
    } else {
      this.router.navigate(["coordinator/dashboard"]);
    }
    console.log(this.loginForm.value.email);
    //this.router.navigateByUrl('/admin');
  }
}
