import { EmployerTableComponent } from "../employer-table/employer-table.component";
import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";
import { map } from "rxjs/operators";
import { Component, OnInit, NgZone } from "@angular/core";
import * as firebase from "firebase";
import { environment } from "../../../environments/environment";
import { Users } from "../../_models/users";
import { StudentDetails } from "../../_models/student-detail";
import { ActiveInternships } from "../../_models/activeInternship";
import { Employer } from "../../_models/employer";
//import { FirebaseEmployerService } from "../../_services/firebase-employer.service";
import { Router } from "@angular/router";
import { MatTableModule } from "@angular/material/table";

@Component({
  selector: "app-coordinator-studentlist",
  templateUrl: "./coordinator-studentlist.component.html",
  styleUrls: ["./coordinator-studentlist.component.scss"]
})
export class CoordinatorStudentlistComponent implements OnInit {
  private auth: firebase.auth.Auth;
  private database: firebase.database.Database;
  students: StudentDetails[];
  internships: Map<string, ActiveInternships>;
  activeInternships: ActiveInternships[];
  currentStudent: StudentDetails;

  constructor(
    private breakpointObserver: BreakpointObserver,
    zone: NgZone,
    private router: Router
  ) {
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebase);
    }
    this.auth = firebase.auth();
    //this.newlist2=[];
    this.database = firebase.database();
  }

  readStudentData(path: string) {
    let studentArray = [];
    let activeInternships: Map<string, ActiveInternships> = this.internships;
    let updatedActiveInternships = new Map<string, ActiveInternships>();
    let internshipsArray = [];

    this.database
      .ref(path)
      .once("value")
      .then(function(snapshot) {
        console.log(snapshot.val());
        snapshot.forEach(function(childSnapshot) {
          if (childSnapshot.val().username) {
            // save the data into a model
            let studentDetails = new StudentDetails();
            let name = childSnapshot.val().username.split(" ");
            studentDetails.firstName = name[0];
            studentDetails.lastName = name[1];
            studentDetails.course = childSnapshot.val().course;
            studentDetails.year = childSnapshot.val().year;

            // setting the internship status based on values from db
            if (childSnapshot.val().currentInternshipId) {
              studentDetails.status = "In Progress";

              // merging records from student and internship table
              let currentInternshipRecord: ActiveInternships = Object.create(
                activeInternships[childSnapshot.val().currentInternshipId]
              );
              currentInternshipRecord.studentName = childSnapshot.val().username;
              currentInternshipRecord.progress = Math.floor(
                Math.random() * 12 + 1
              );

              internshipsArray.push(currentInternshipRecord);
            } else if (childSnapshot.val().applications) {
              studentDetails.status = "Applying";
            }

            studentArray.push(studentDetails);
          }
        });
      });

    this.students = studentArray;
    this.activeInternships = internshipsArray;
    console.log(this.activeInternships);
    console.log(this.students);
  }

  readActiveInternshipData(path: string) {
    let activeInternships = new Map<string, ActiveInternships>();

    this.database
      .ref(path)
      .once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          let internship = new ActiveInternships();
          internship.companyName = childSnapshot.val().companyName;
          internship.description = childSnapshot.val().jobScope;

          activeInternships[childSnapshot.key] = internship;
        });
      });
    this.internships = activeInternships;
    console.log(this.internships);
  }

  ngOnInit() {
    this.readActiveInternshipData("/internships");
    this.readStudentData("/student");
  }

  goToStudent(selectedStudent: StudentDetails){
    // var student = new Student;
    // var fullName = selectedStudent.firstName + " " + selectedStudent.lastName;
    // console.log(".",fullName,".");
    // for(var i=0;i<this.activeInternships.length;i++){
    //   console.log(".",this.activeInternships[i].studentName,".");
    //   if ( fullName == this.activeInternships[i].studentName){
    //     console.log("WORKS?");
    //     selectedStudent.companyName = this.activeInternships[i].companyName;
    //   }
    // }
    this.router.navigate(['/coordinator/student'], { queryParams: { 
      firstName: selectedStudent.firstName,
      lastName: selectedStudent.lastName,
      course: selectedStudent.course,
      year:  selectedStudent.year,
      status: selectedStudent.status,
      // companyName: selectedStudent.companyName
      // currentInternshipId: student.currentInternshipId,
      // applications: student.applications
    }});
  }
}
