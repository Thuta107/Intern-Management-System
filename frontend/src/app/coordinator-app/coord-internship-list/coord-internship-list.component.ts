import { Component, OnInit } from "@angular/core";
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
import * as jsPDF from "jspdf";

@Component({
  selector: "app-coord-internship-list",
  templateUrl: "./coord-internship-list.component.html",
  styleUrls: ["./coord-internship-list.component.scss"]
})
export class CoordInternshipListComponent implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
  private baseUrl = environment.apiUrl + "student";
  private zone: NgZone;
  private database: firebase.database.Database;
  private auth: firebase.auth.Auth;
  public currentUserType: any;
  public newStud = "hello";
  newlist: Object[];
  students: Object[];
  isCollapsed = true;
  // studentInfo: any;

  constructor(private router: Router, private http: HttpClient, zone: NgZone) {
    firebase.initializeApp(environment.firebase);
    this.auth = firebase.auth();
    this.zone = zone;
    // this.newlist2=[];
    this.database = firebase.database();
    this.readData("/student"); // For testing.
  }

  readData(path: string) {
    console.log("read started");
    let temparr = [];
    const tempNameArr = [];
    const setArr = [];
    this.database
      .ref(path)
      .once("value")
      .then(function(snapshot) {
        console.log(snapshot.val());
        const user: Users = snapshot.val();
        console.log(typeof user);
        console.log(user);
        const newprops = Object.keys(user);
        const newlist2 = [];
        for (const prop of newprops) {
          const userdet = Object.keys(prop);
          const eachUser = user[prop];
          console.log(user[prop]);
          const allprops = Object.keys(eachUser);
          for (const eachdet of allprops) {
            console.log(user[prop][eachdet]);
            const dispDat = user[prop][eachdet];
            console.log(typeof dispDat);
            if (eachdet === "username") {
              temparr.push("Name:   ");
              tempNameArr.push(user[prop][eachdet]);
              temparr.push(user[prop][eachdet]);
              setArr.push(temparr);
              temparr = [];
            } else if (eachdet === "email") {
              temparr.push("Email:   ");
            } else if (eachdet === "internship_company") {
              temparr.push("Internship Company:   ");
            } else if (eachdet === "internship_progress") {
              temparr.push("Internship Progress:   ");
            } else if (eachdet === "internship_start") {
              temparr.push("Internship Start:   ");
            }
            if (eachdet !== "username") {
              temparr.push(user[prop][eachdet]);
            }
            // temparr.push(user[prop][eachdet]);
            // setArr.push(temparr);
            // temparr = [];
          }
        }
        const newStudent = user;
        // this.newlist.push(user[prop][eachdet]);
        // console.log(this.newlist);
        // console.log(typeof(this.newlist));
      });
    // this.newlist = temparr;
    this.newlist = setArr;
    this.students = tempNameArr;
  }

  generateStudentReport(studentIndex) {
    console.log(studentIndex);
    let student = this.students[studentIndex];
    let studentDetails = this.newlist[studentIndex];
    console.log(student);

    var doc = new jsPDF();

    // name
    doc.setFontSize(35);
    doc.text(student, 20, 20);

    // email
    doc.setFontSize(10);
    doc.text("Email", 20, 30);
    doc.text(studentDetails[1], 40, 30);

    // internship comapny
    doc.setFontSize(20);
    doc.text("Company:", 20, 40);
    doc.text(studentDetails[3], 60, 40);

    // internship comapny
    doc.setFontSize(15);
    doc.text("Progress:", 20, 50);
    doc.text(studentDetails[5], 55, 50);

    doc.output("dataurlnewwindow", "test.pdf");

    // set name
  }

  getStudentDetails(event) {
    console.log("works!");
    this.isCollapsed = !this.isCollapsed;
    // let intid = parseInt(id);
    // this.studentInfo = this.newlist[id];
  }
}
