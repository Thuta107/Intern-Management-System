import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../_services/firebase.service';
import {Observable} from 'rxjs/Observable';

import { Application } from '../_models/application';
@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.scss']
})
export class MyApplicationsComponent implements OnInit {
  public applications: Application[];
  private id: string;
  constructor(private firebaseService: FirebaseService) {
    this.id = localStorage.getItem("currentUserID");
      this.firebaseService.getApplications(this.id, (applicationsObs) => {
        applicationsObs.subscribe(applications => {
          console.log("AApppp" + applications);
          console.log("ape" + applications.length);
          //console.log(applications.details);
          //console.log(applications.status);
            if (applications !== undefined && applications.length != 0) {
                this.applications = applications;
            }
        });
      });
      console.log('alvin')
      //console.log(applications)
   }

  ngOnInit() {
  }

  acceptButton(application: Application, i: number) {
    
    this.firebaseService.database.ref("Application/"+application.id+"/status").set("Accepted");
    this.firebaseService.database.ref("student/"+this.id+"/currentInternshipId").set(application.internshipId);

    this.applications.splice(i, 1);
    console.log("accept running");
  
  }

  rejectButton(application: Application, i: number) {
    this.firebaseService.database.ref("Application/"+application.id+"/status").set("Rejected");
    this.applications.splice(i, 1);

  
  }
}
