import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { environment } from "../../../environments/environment";
import * as firebase from "firebase";

@Component({
  selector: "app-internship-doc-viewer",
  templateUrl: "./internship-doc-viewer.component.html",
  styleUrls: ["./internship-doc-viewer.component.scss"]
})
export class InternshipDocViewerComponent implements OnInit {
  private database: firebase.database.Database;
  private storage: firebase.storage.Storage;
  private storageRef;

  constructor(private route: ActivatedRoute) {
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebase);
    }

    this.storageRef = firebase.storage().ref();
  }

  studentId: string;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.studentId = params["studentId"];
    });

    this.storageRef
      .child(this.studentId)
      .listAll()
      .then(function(res) {
        res.prefixes.forEach(function(folderRef) {
          console.log(folderRef);
        });
      })
      .catch(function(error) {
        console.log("error");
      });

    console.log(this.studentId);
  }
}
