import { Component, OnInit } from '@angular/core';
import { Injectable, NgZone } from "@angular/core";
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
import { environment } from "../../../environments/environment";
import { map } from "rxjs/operators";
import { Users } from "../../_models/users";
import { NgIf } from "@angular/common";
import { p } from '@angular/core/src/render3';
import { StudentDetails } from "../../_models/student-detail";
import { ActiveInternships } from "../../_models/activeInternship";
// import { Student } from "src/app/_models/student";
// import { Router } from '@angular/router';


@Component({
  selector: 'app-coordinator-student',
  templateUrl: './coordinator-student.component.html',
  styleUrls: ['./coordinator-student.component.scss']
})
export class CoordinatorStudentComponent implements OnInit {

  ngOnInit() {
    // this.readInternshipData("/internships"); 
    // this.readApplicationData("/Application");
    // this.readStudentData("/student"); 

    this.route.queryParams.subscribe(params => {
      console.log(params)  
      //this.name = params['name'];
      this.currentStudent = new StudentDetails();
      this.currentStudent.firstName = params['firstName'];
      this.currentStudent.lastName = params['lastName'];
      this.currentStudent.course = params['course'];
      this.currentStudent.status = params['status'];
    })
  }

  // private baseUrl = environment.apiUrl + "student";
  // private zone: NgZone;
  // private database: firebase.database.Database;
  // private auth: firebase.auth.Auth;
  // public currentUserType: any;
  // public newStud = "hello";
  // newlist: Object[];
  // students: Object[];
  // internships: Object[];
  // applications: Object[];
  // descriptions: string[];
  // isCollapsed: boolean = true;
  // noOfInternships: number = 0;
  // noOfApplications: number = 0;
  currentStudent: StudentDetails;
  // student: Student;

  constructor(private router: Router, private http: HttpClient, zone: NgZone,private route: ActivatedRoute) {
    // firebase.initializeApp(environment.firebase);
    // this.auth = firebase.auth();
    // this.zone = zone;
    // this.database = firebase.database();
    // this.readInternshipData("/internships"); 
    // this.readStudentData("/student"); 
    // this.noOfInternships = 0;
    // this.noOfApplications = 0;
    // this.internships  =  [];
    // this.applications = [];
  }

  // readStudentData(path: string) {
  //   let temparr = [];
  //   let tempNameArr = [];
  //   let setArr = [];  
  //   var tempStr;
  //   let noOfInternships = this.noOfInternships;
  //   // console.log(noOfInternships);
  //   let internships = this.internships;
  //   let applications = this.applications;
  //   let noOfApplications = this.noOfApplications;
  //   this.database
  //     .ref(path)
  //     .once("value")
  //     .then(function(snapshot) {
  //       // console.log("snapshot.val(): ", snapshot.val());
  //       let users: Users = snapshot.val();
  //       // console.log("User: ",users);
  //       var studentKeys = Object.keys(users);
  //       console.log("Student keys: ",studentKeys);
  //       for (var i of studentKeys) {
  //         var eachStudent = users[i];
  //         // console.log("each user: ",eachStudent);
  //         var properties = Object.keys(eachStudent);
  //         // console.log("properties: ",properties);
  //         for (var j of properties) {
  //           // console.log(j);
  //           var data = users[i][j];
  //           // console.log("data: ",data);
  //           if (j == "username" && data != "") {
  //             // temparr.push("Name:   ");
  //             tempNameArr.push(data);
  //             setArr.push(temparr);
  //             temparr = []; 
  //             // temparr.push(data);
  //           } 
  //           else if (j == "email" && data != "") {
  //             tempStr = "Email: " + data;
  //             temparr.push(tempStr);
  //             // temparr.push(data);
  //           } 
  //           else if (j == "year" && data != "") {
  //             tempStr = "Year of study: " + data;
  //             temparr.push(tempStr);
  //             // temparr.push("Year of Study:   ");
  //             // temparr.push(data);
  //           } 
  //           else if (j == "course" || j == "Course") {
  //             tempStr = "Course: " + data;
  //             temparr.push(tempStr);
  //             // temparr.push("Course:   ");
  //             // temparr.push(data);
  //           } 
  //           else if (j == "currentInternshipId" && data != "") {
  //             // temparr.push("Current Internship   ");
  //             // noOfInternships = this.noOfInternships;
  //             // internships = this.internships;
  //             // console.log("IS: ",internships);
  //             for (var l = 0; l < 12; l++){
  //               if (internships[l][0] == data && internships[l][0]){
  //                 var companyName = internships[l][1];
  //                 // temparr.push("Current Internship Company Name: ",companyName);
  //                 // temparr.push(companyName);
  //                 var position = internships[l][2];
  //                 tempStr = "Current internship's company name: " + companyName;
  //                 temparr.push(tempStr);
  //                 tempStr = "Current internship position: " + position;
  //                 temparr.push(tempStr);
  //                 // temparr.push(position);
  //               }
  //             }
  //           } 
  //           else if (j == "applications" && data != "") {
  //             // temparr.push("Applications:   ");

  //             var applicationKeys = Object.keys(data);
  //             // console.log("APLIKEYS: ",applicationKeys); 
  //             var n = 1;
  //             for (var k of applicationKeys){
  //               var application = users[i][j][k];
  //               console.log(application);
  //               console.log(applications.length);
  //               for (var m = 0; m < applications.length; m++){
  //                 console.log(applications[m][0]);
  //                 if (applications[m][0] == application){
  //                   console.log("workssss");
  //                   var detail = applications[m][1];
  //                   var status = applications[m][2];
  //                   var applicationStr = "Application " + n;
  //                   var appDetail = "Application detail: " + detail;
  //                   var appStatus = "Application status: " + status;
  //                   temparr.push(applicationStr,appDetail,appStatus);
  //                   n++;
  //                 }
  //               }
  //               // data = users[i][j][k];
  //               // var application = users[i][j][k];
  //               // console.log("application: ", application);
  //               // temparr.push(application);
  //             }
  //           }
  //         }
  //       }
  //     })
  //   this.newlist = setArr;
  //   this.students = tempNameArr;
  // }

  // readInternshipData(path: string){
  //   let internshipData = [];
  //   let internship = [];
  //   let noOfInternships = 0;
  //   this.database
  //     .ref(path)
  //     .once("value")
  //     .then(function(snapshot) {
  //       snapshot.forEach(function(childSnapshot) {
  //         // let internships: Users = snapshot.val();
  //         // var internshipKeys = Object.keys(internships);
  //         // console.log("internship: ",typeof(snapshot.val()));
  //         var company =  childSnapshot.val().companyName;
  //         var position = childSnapshot.val().jobScope;
  //         var ISKey = childSnapshot.val().id;
  //         // console.log(company);
  //         // console.log(position);
  //         // console.log(ISKey);
  //         internship.push(ISKey);
  //         internship.push(company);
  //         internship.push(position);
  //         // console.log(internship);
  //         internshipData.push(internship);
  //         // console.log(internshipData);
  //         internship = [];
  //         // console.log(noOfInternships);
  //         noOfInternships = noOfInternships + 1;
  //         console.log("number: ",noOfInternships);
  //         // for (var i of internshipKeys){
  //         //   var eachInternship = internships[i];
  //         //   console.log("EIS: ",eachInternship);
  //           // var company =  eachInternship.companyName;
  //           // var description = eachInternship.jobScope;
  //           // var ISKey = eachInternship.id;
  //           // console.log(company);
  //           // console.log(description);
  //           // console.log(ISKey);
  //         //   internshipData.push()
  //         //   var properties = Object.keys(eachInternship);
  //         //   for (var j of properties){
  //         //     var data = internships[i][j];
  //         //   }
  //         //   // console.log("desc: ",this.descriptions);
  //         // }

  //       })
  //   //     this.internships = internshipData;
  //   //     console.log("DATA: ",internshipData);
  //   //     console.log(this.internships);
  //   })
  //   this.internships = internshipData;
  //   this.noOfInternships = noOfInternships;
  //   // console.log("DATA: ",internshipData);
  //   // console.log(this.internships);
  // }

  // readApplicationData(path: string){
  //   let application = [];
  //   let applicationData =  [];
  //   let noOfApplications =  0;
  //   this.database
  //     .ref(path)
  //     .once("value")
  //     .then(function(snapshot) {
  //       snapshot.forEach(function(childSnapshot) {
  //         var applicationKey = childSnapshot.val().id;
  //         var detail = childSnapshot.val().details;
  //         var status = childSnapshot.val().status;
  //         application.push(applicationKey);
  //         application.push(detail);
  //         application.push(status);
  //         applicationData.push(application);
  //         application = [];
  //         noOfApplications = noOfApplications + 1;
  //         // console.log("Applications: ",applicationData);
  //       })
  //     })
      
  //     this.applications = applicationData;
  //     console.log(this.applications);
  //     this.noOfApplications = noOfApplications;
  // }

  // getStudentDetails(event, id: Number) {
  //   // console.log(id);
  //   // console.log("works!");
  //   this.isCollapsed = !this.isCollapsed;
  //   // let intid = parseInt(id);
  //   // this.studentInfo = this.newlist[id];
  // }

  // goToStudent(pagename:string)
  // {
  //   // this.router.navigate([pagename]);
  //   this.router.navigate(['coordinator/student']);
  // }

}