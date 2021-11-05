import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase";
import { Employer } from "../../_models/employer";
// import { EMPLOYERS } from '../employer-list/demo-employees';
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-employer-list",
  templateUrl: "./employer-list.component.html",
  styleUrls: ["./employer-list.component.scss"]
})
export class EmployerListComponent implements OnInit {
  //employers = EMPLOYERS;
  employers: Employer[];
  private database: firebase.database.Database;

  constructor() {
    firebase.initializeApp(environment.firebase);
    firebase.auth();
    this.database = firebase.database();
    this.employers = [];
    this.readEmployers();
  }

  readEmployers() {
    const path = "/Employer";
    /*
    this.database.ref(path).once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
          intern = JSON.parse(snapshot.val());
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          interns.push(intern);
          // ...
      });
      console.log(interns  + " interns returned");
      callbacks(of(interns));

    });
    */

    let employers_temp = [];

    this.database
      .ref(path)
      .once("value")
      .then(function(snapshot) {
        console.log("Read");
        console.log(snapshot.val());
        const employers_raw = snapshot.val();
        snapshot.forEach(function(childSnapshot) {
          console.log(childSnapshot.val());
          //const employer_raw = JSON.parse(childSnapshot.val());
          const employer_raw = childSnapshot.val();
          const companyName = employer_raw.name;
          const phone = employer_raw.phone;
          const emailAdd = employer_raw.email;
          //const jSpec = employer_raw.jSpec;
          const loc = employer_raw.location;

          const new_employer: Employer = {
            id: "someId",
            email: 'anEmail',
            companyName: companyName,
            phone: phone,
            //email: emailAdd,
            location: loc
          };
          console.log("forEach");
          //console.log(new_employer);
          employers_temp.push(new_employer);

          //this.employers.push(new_employer);
        });
      });
    //console.log(employers_temp.length);
    console.log(employers_temp);
    this.employers = employers_temp;
  }

  ngOnInit() {}
}
