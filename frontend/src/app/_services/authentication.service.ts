import { Injectable, NgZone } from "@angular/core";
import { Users } from "../_models/users";
import { Student } from "../_models/student";
import { Employer } from './../_models/employer';

import { Headers, Http, Response } from "@angular/http";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import * as firebase from "firebase";
import { throwError } from "rxjs";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { FirebaseService } from "./firebase.service";
import { Application } from "../_models/application";

@Injectable()
export class AuthenticationService {
  private baseUrl = environment.apiUrl + "users";
  private zone: NgZone;
  private database: firebase.database.Database;
  private auth: firebase.auth.Auth;
  public currentUserType: any;

  // uid = this.afAuth.authState.pipe(
  //     map(authState => {
  //     if (!authState) {
  //         return null;
  //     }
  //     else {
  //         return authState.uid;
  //     }
  //     })
  // );
  // role = of(true);
  
  constructor(private router: Router, private http: HttpClient, zone: NgZone, private firebaseService: FirebaseService) {
    this.auth = firebase.auth();
    this.zone = zone;
    this.database = firebase.database();
    this.readData("/student"); //For testing.
  }

  /*
   *   Write user data to firebase.
   */

  writeUserData(
    userId: string,
    name: string,
    email: string,
    userType: string,
    password: string = "",
    imageUrl: string = ""
  ) {
    var databaseRef: string = "student/";
    if (userType != null) {
      databaseRef = userType + "/";
      this.database.ref(databaseRef + userId).set({
        username: name,
        email: email,
        password: password,
        userType: userType,
        profile_picture: imageUrl
      });
    } else {
      this.database.ref(databaseRef + userId).set({
        username: name,
        email: email,
        password: password,
        userType: userType,
        profile_picture: imageUrl,
        currentInternshipId: ""
      });
    }
  }

  /*
   *   Read data from path (For user).
   */
  readData(path: string) {
    console.log("read started");
    this.database
      .ref(path)
      .once("value")
      .then(function (snapshot) {
        console.log(snapshot.val());
        let user: Users = snapshot.val();
        console.log(user);
      });
  }

  writeData(path: string, data: any) {
    this.database.ref(path);
  }

  authenticate(userData: Users): Observable<any> {
    console.log("authenticatingasd asdasdas");
    let getHeaders: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this.http.post<any>(this.baseUrl + "/authenticate", userData, {
      headers: getHeaders
    });
  }

  logout() {
    this.auth.signOut();
  }

  login(userData: Users, userType: string = null) {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      result => {
        var user = result.user;
        console.log(user.displayName + "name logged in");
        localStorage.setItem("currentUserID", user.uid);
        localStorage.setItem("currentUser", user.displayName);
        localStorage.setItem("currentUserType", "admin");
        //localStorage.setItem('account_number', response.apiKey);

        this.zone.run(() => {
          if (userType != null) {
            this.router.navigate(["coordinator/dashboard"]);
          } else {
            this.router.navigate([""]);
          }
        });

        this.writeUserData(user.uid, user.displayName, user.email, userType);
        return true;
      },
      error => {
        // The provider's account email, can be used in case of
        // auth/account-exists-with-different-credential to fetch the providers
        // linked to the email:
        var email = error.email;
        console.log("login fail for " + email);
        return false;
      }
    );

    // let tmpUser: Users;
    // let getHeaders: HttpHeaders = new HttpHeaders({
    //     'Content-Type': 'application/json'
    // });
    // console.log("Authenticating");
    // this.http.post<any>(this.baseUrl + '/authenticate', userData, { headers: getHeaders })
    //     .subscribe(response => {
    //         tmpUser = response;

    //         console.log(tmpUser.username);
    //         if (tmpUser.username == userData.username) {
    //             localStorage.setItem('currentUser', response.username);
    //             localStorage.setItem('currentUserType', response.userType);
    //             localStorage.setItem('account_number', response.apiKey);

    //             this.router.navigate(['']);
    //             //window.location.

    //             return true;
    //         }
    //     }, error => {alert("Incorrect Username or Password!");
    //     });
  }

  /*
     login(userData: Users): Promise<Users> {
         console.log("Authenticating");
         return this.http.post(this.baseUrl + '/authenticate', userData)
             .toPromise().then(response => {

                 
                 console.log(response.json().username);
                 if (response.status == 200) {
                     localStorage.setItem('currentUser', JSON.stringify(response));
                     localStorage.setItem('currentUserType', response.json().userType);
                     localStorage.setItem('apiKey' ,response.json().apiKey);
 
                     this.currentUserType = response.json().userType;
                     this.router.navigate([''])
                     //window.location.
          
                     return true;
                 }
                 else if (response.status == 400) {
                     console.log('Authentication fail');
                     return false;
                 }
             })
             .catch(this.handleError);
     }
    */

  /*
   * This function logins the employer through google sign in
   */
  employerLogin(userData: Users, userType: string = null) {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      result => {
        var user = result.user;
        console.log(user.displayName + "name logged in");

        // Set data to localstorage so that it can be used for other processes
        localStorage.setItem("currentUserEmail", user.email);
        localStorage.setItem("currentUserID", user.uid);
        localStorage.setItem("currentUser", user.displayName);
        localStorage.setItem("currentUserType", "client");

        this.zone.run(() => {
          // If the user has never used the application
          if (result.additionalUserInfo.isNewUser == true){
            // navigate to a form and register as an employer
            this.router.navigate(["gmail-register"]);
          } else {
            // Remove currentUserEmail for privacy
            localStorage.removeItem("currentUserEmail");
            // Redirect to employer dashboard
            this.router.navigate(["employer/employer-joblist"]);
          }
        });

        this.writeUserData(user.uid, user.displayName, user.email, userType); //
        return true;
      },
      error => {
        // The provider's account email, can be used in case of
        // auth/account-exists-with-different-credential to fetch the providers
        // linked to the email:
        var email = error.email;
        console.log("login fail for " + email);
        return false;
      }
    );
  }
  

  /*
   * This function logins the employer through manual email and password
   */
  employerLoginEmail(username: string, password: string){
    let error = false;

    // Login the user using email and password
    this.auth.signInWithEmailAndPassword(username, password).then(
      result => {
        var user = result.user;
        console.log(user.displayName + "name logged in");

        // Set data to localstorage so that other processes can use it
        localStorage.setItem("currentUserID", user.uid);
        localStorage.setItem("currentUser", 'no name yet');
        localStorage.setItem("currentUserType", "client");
      },
      error => {
        // If the password is wrong
        if (error.code === 'auth/wrong-password'){
          alert('Wrong password.');
        }
        console.log(error.code);
        console.log(error.message);
        error = true;
        return false;
      }
    )
    // If there is no error, redirect to employer dashboard
    if (!error){
      this.zone.run(() => {
        this.router.navigate(["employer/employer-joblist"]);
      });
    }
    return true;
  }

  coordLoginEmail(userData: Users,userType:string=null){
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      result =>{
        var userCoord = result.user;
        localStorage.setItem("currentUserID", userCoord.uid);
        localStorage.setItem("currentUser", userCoord.displayName);
        //localStorage.setItem("currentUserType", "admin");
        this.zone.run(()=>{
          this.router.navigate(["/admin"]);
        });
      }
    )
    /*let error=false;
    this.auth.signInWithEmailAndPassword(email,password).catch((error)=>{
      error=true;
      return false;
    })
    if(!error){
      this.zone.run(()=>{
        this.router.navigate(["coordinator"]);
      })
    }
    return true;*/
  }
}
