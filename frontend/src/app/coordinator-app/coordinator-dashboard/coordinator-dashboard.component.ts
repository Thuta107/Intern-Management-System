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
import * as jsPDF from "jspdf";
// import { Student } from "src/app/_models/student";
// import { Student } from "src/app/_models/student";
// import { currentId } from "async_hooks";

@Component({
  selector: "app-coordinator-dashboard",
  templateUrl: "./coordinator-dashboard.component.html",
  styleUrls: ["./coordinator-dashboard.component.scss"]
})
export class CoordinatorDashboardComponent implements OnInit {
  private auth: firebase.auth.Auth;
  private database: firebase.database.Database;
  students: StudentDetails[];
  internships: Map<string, ActiveInternships>;
  activeInternships: ActiveInternships[];

  employers: Employer[];
  dictEmployers = [];
  employerColumns: string[] = ["name", "location"];
  //employersWithQuery = [];

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: "Students", cols: 1, rows: 1 },
          { title: "Employers", cols: 1, rows: 1 },
          { title: "Active Internships", cols: 1, rows: 1 }
        ];
      }

      return [
        { title: "Students", cols: 2, rows: 1 },
        { title: "Employers", cols: 1, rows: 1 },
        { title: "Active Internships", cols: 1, rows: 1 }
      ];
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    zone: NgZone,
    private router: Router
  ) {
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebase);
    }
    //firebase.initializeApp(environment.firebase);
    this.auth = firebase.auth();
    //this.newlist2=[];
    this.database = firebase.database();
  }

  readEmployerData(path: string) {
    console.log("Reading employers");
    let employerArray = [];
    let queryArray = [];
    let tempDictEmployers = [];

    this.database
      .ref(path)
      .once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          /** 
          let employer = new Employer();
          employer.id = childSnapshot.val().id;
          employer.companyName = childSnapshot.val().companyName;
          employer.phone = childSnapshot.val().phone;
          employer.location = childSnapshot.val().location
          employerArray.push(employer);
          */
          // console.log(childSnapshot);
          let data = new Employer();
          data.id = childSnapshot.child("id").val();
          data.companyName = childSnapshot.child("companyName").val();
          data.phone = childSnapshot.child("phone").val();
          data.location = childSnapshot.child("location").val();

          employerArray.push(data);

          tempDictEmployers.push({
            name: data.companyName,
            location: data.location
          });
          /** 
          let employerWithQuery = {
            employer: data,
            query: "{ name: '" + data.companyName + "' }"
          }

          queryArray.push(employerWithQuery);
          */
        });
      });

    this.employers = employerArray;
    this.dictEmployers = tempDictEmployers;

    //this.employersWithQuery = queryArray;

    console.log(this.employers);
    console.log(this.dictEmployers);
  }

  goToEmployer(selectedEmployer: Employer) {
    console.log("Go to employer: " + selectedEmployer.companyName);
    this.router.navigate(["/coordinator/employer-details"], {
      queryParams: {
        companyName: selectedEmployer.companyName,
        phone: selectedEmployer.phone,
        id: selectedEmployer.id,
        location: selectedEmployer.location
      }
    });
  }

  viewInternshipDocs(internshipRecord: ActiveInternships) {
    console.log(internshipRecord.studentRecordId);
    let url =
      "https://console.firebase.google.com/u/1/project/fit3170-intership/storage/fit3170-intership.appspot.com/files/" +
      internshipRecord.studentRecordId;
    window.open(url, "_blank");
    // this.router.navigate(["/coordinator/internshipdocs"], {
    //   queryParams: {
    //     studentId: internshipRecord.studentRecordId
    //   }
    // });
  }

  generateInternshipReport(internshipRecord: ActiveInternships) {
    var doc = new jsPDF();

    // name
    doc.setFontSize(35);
    doc.text(internshipRecord.studentName, 20, 20);

    // company name
    doc.setFontSize(20);
    doc.text("Company: ", 20, 40);
    doc.text(internshipRecord.companyName, 60, 40);

    // job scope
    doc.setFontSize(20);
    doc.text("Job Scope: ", 20, 50);
    doc.text(internshipRecord.description, 60, 50);

    // progress
    doc.setFontSize(20);
    doc.text("Progress: ", 20, 60);
    doc.text(internshipRecord.progress.toString(), 60, 60);

    // files
    doc.setFontSize(10);
    doc.text("Progress: ", 20, 70);
    doc.text(
      "https://console.firebase.google.com/u/1/project/fit3170-intership/storage/fit3170-intership.appspot.com/files/" +
        internshipRecord.studentRecordId,
      60,
      70
    );

    console.log("hihi");

    doc.output("dataurlnewwindow", "test.pdf");
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
              currentInternshipRecord.studentRecordId = childSnapshot.key;

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
    console.log("Active IS: ", this.activeInternships);
    console.log("Students:", this.students);
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
  logout() {
    this.router.navigate(["/coordinator/login"]);
  }

  ngOnInit() {
    console.log("Coord-dash init");
    this.readActiveInternshipData("/internships");
    this.readStudentData("/student");
    this.readEmployerData("/Employer");
    //let temp_employers = this.employerService.readEmployer();
    //console.log(temp_employers);
  }

  goToStudent(selectedStudent: StudentDetails) {
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
    this.router.navigate(["/coordinator/student"], {
      queryParams: {
        firstName: selectedStudent.firstName,
        lastName: selectedStudent.lastName,
        course: selectedStudent.course,
        year: selectedStudent.year,
        status: selectedStudent.status
        // companyName: selectedStudent.companyName
        // currentInternshipId: student.currentInternshipId,
        // applications: student.applications
      }
    });
  }
}
