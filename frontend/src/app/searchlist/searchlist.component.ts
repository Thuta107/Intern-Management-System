import { Component, OnInit } from '@angular/core';
import { DataParamService } from '../_services/data-param.service';
import { Internship } from '../_models/internship';
import { Application } from '../_models/application';
import { FirebaseService } from '../_services/firebase.service';

@Component({
  selector: 'app-searchlist',
  templateUrl: './searchlist.component.html',
  styleUrls: ['./searchlist.component.scss']
})
export class SearchlistComponent implements OnInit {

  constructor(private dataParamService: DataParamService, private firebaseService: FirebaseService) {
    this.dataParamService.currentMessage.subscribe(internshipList => {
      this.internshipList = internshipList;
      console.log(internshipList + " received search");
    })
  }
  public internshipList: Internship[];

  ngOnInit() {

  }

  applyButton(intern : Internship) {
    var id = localStorage.getItem("currentUserID");
    let application = new Application();
    application.studentId = id;
    application.details = intern.jobScope; 
    application.status = "Applying";
    application.internshipId = intern.id;
    let newPostRef = this.firebaseService.database.ref("Application").push();
    let pushKey = newPostRef.key.toString();  
    application.id = pushKey;
    newPostRef.set(application);
    this.firebaseService.pushObject("student/"+id+"/applications", <string> pushKey);
  }


}
