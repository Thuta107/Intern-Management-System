import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import * as firebase from "firebase";
import { userDetails, Users } from "../_models/index";
import { Internship } from "../_models/internship";
import { of } from "rxjs";
//import { AngularFireDatabase, AngularFireList, } from '@angular/fire/database';
//import { start } from 'repl';
import { endOfDay } from "date-fns";
import { environment } from "../../environments/environment";
import { Application } from "../_models/application";

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  public database: firebase.database.Database;

  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebase);
    }
    this.database = firebase.database();
  }

  AddInternshipFirebase() {
    let internship: Internship = new Internship();
    internship.companyName = "company 3";
    internship.description = "kopi o siu tai";
    internship.jobScope = "coffee boy";
    internship.seats = 23;
    internship.companyName = "Company 2";
    internship.description = "Data Entry";
    internship.jobScope = "Data Analyst";
    internship.seats = 1;
    var newPostRef = this.database.ref("internships").push();
    internship.id = newPostRef.key.toString();
    newPostRef.set(internship);
  }

  addStudentDetails(studentDetails: userDetails) {
    var id = localStorage.getItem("currentUserID");
    this.database.ref("studentdetails/" + id).set(studentDetails);
    //newPostRef.set(studentDetails);
  }

  pushApplication() {}

  pushObject(path: string, object: any): string {
    let newPostRef = this.database.ref(path).push();
    newPostRef.set(object);
    return newPostRef.key.toString();
  }

  searchInternship(
    start: string,
    callbacks: (internObs: Observable<Internship[]>) => any
  ) {
    // return this.db.list('/internships', ref => ref.orderByChild('jobScope').limitToFirst(2).startAt(start).endAt(end));

    let interns: Internship[] = [];
    let intern: Internship;
    this.database
      .ref("internships")
      .orderByChild("jobScope")
      .limitToFirst(4)
      .startAt(start)
      .endAt(start + "\uf8ff")
      .once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          intern = childSnapshot.val();
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          interns.push(intern);
        });
        //this.internObs = of(interns);
        //this.zone.run(() => { this.internObs = of(interns) });
        callbacks(of(interns));
      });
  }
  //new changes
  searchCoord(data: Users, email: string, password: string) {
    var inDatabase: boolean;
    // return this.db.list('/internships', ref => ref.orderByChild('jobScope').limitToFirst(2).startAt(start).endAt(end));
    this.database.ref("coordinators").once("value", snapshot => {
      var getEmail = email + "/email";
      var getPass = email + "/password";
      console.log(getPass);
      console.log(snapshot.child(getPass).val() == password);
      if (
        snapshot.child(getEmail).exists() &&
        snapshot.child(getPass).val() == password
      ) {
        console.log("Email and password Exists");

        inDatabase = true;
      } else {
        inDatabase = false;
        console.log("Email Doesnt Exists");
        this.database
          .ref("coordinators")
          .child(email)
          .set(data);

        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .catch(error => {
            console.log(error.code);
            console.log(error.message);
          });
      }
    });
    return inDatabase;
  }
  regCoord(
    data: Users,
    email: string,
    password: string,
    userType: string,
    imageUrl: string = ""
  ) {
    this.database.ref("coordinators").once("value", snapshot => {
      this.database
        .ref("coordinators")
        .child(email)
        .set(data);
      console.log("in reg coord");
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(error => {
          console.log("register failed");
        });
    });
  }
  getApplications(
    id: string,
    callbacks: (applicationObs: Observable<Application[]>) => any
  ) {
    var studentPath = "student/" + id + "/applications";
    let applications: Application[] = [];
    let application: Application;
    var hello;
    this.database.ref(studentPath).once("value", snapshot => {
      snapshot.forEach(childSnapshot => {
        var posRef = childSnapshot.val().toString();
        console.log(studentPath);
        console.log(posRef, "postref");
        let exactRef = "Application/" + posRef;
        console.log(exactRef, "exactRef");
        console.log(this);
        this.database.ref(exactRef).once("value", snapshot2 => {
          console.log(exactRef, "exactRef");

          application = snapshot2.val();
          console.log(application, "application object");
          if (1 == 1) applications.push(application);
          if (application.status == "Offered") applications.push(application);
          callbacks(of(applications));
        });
      });
    });
  }

  readInternshipsDashboard(
    path: string,
    callbacks: (internObs: Observable<Internship[]>) => any
  ) {
    let interns: Internship[] = [];
    let intern: Internship;
    this.database.ref(path).once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        intern = JSON.parse(snapshot.val());
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        interns.push(intern);
        // ...
      });
      console.log(interns + " interns returned");
      callbacks(of(interns));
    });
  }
}
