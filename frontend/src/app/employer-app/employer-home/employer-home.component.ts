import { AuthenticationService } from './../../_services/authentication.service';
import { Internship } from './../../_models/internship';
import { FirebaseService } from './../../_services/firebase.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatGridList, MatGridTile, MatGridListModule } from '@angular/material';
import * as firebase from 'firebase'
import { of, Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-employer-home',
  templateUrl: './employer-home.component.html',
  styleUrls: ['./employer-home.component.css']
})
export class EmployerHomeComponent implements OnInit {

  private database: firebase.database.Database;
  public internObs: Observable<Internship[]>;
  private startAt: Subject<string> = new Subject<string>();
  //endAt = new Subject();
  private internships: Internship[];
  private internshipList: Internship[];
  private inputFieldVal: any;
  lastKeyTime: number = 0;

  constructor(private router: Router,
    private route: ActivatedRoute,
    public authenticationService: AuthenticationService, private zone: NgZone, private firebaseService: FirebaseService) {
    this.database = firebase.database();


  }

  ngOnInit() {
    this.searchFirebase();
  }

  //Auto complete.
  searchFirebase() {
    this.startAt.subscribe(start => {
      if (start != "") {
        this.firebaseService.searchInternship(start, (interns) => {
          interns.subscribe(internships => {
            if (internships != [] && this.inputFieldVal != "")  {
              this.internships = internships;
            }
          });
        });
      } else {
        this.internships = [];
      }
      
    });
  }

  //Real-time input updates
  searchKey($event) {
    let q:string = $event.target.value;
    if ($event.timeStamp - this.lastKeyTime > 200 || q == "") {
      q.toLowerCase();
      this.startAt.next(q);
      this.inputFieldVal = q;
      // this.endAt.next(q+"\uf8ff");
      console.log(" event start " + q);
      this.lastKeyTime = $event.timeStamp;
      }   
  }

  //Get list.
  getInternshipList() {
    // this.firebaseService.searchInternship(this.inputFieldVal, (interns) => {
    //   interns.subscribe(internships => {
    //     this.internshipList = internships;
    //   });
    // });
    this.internshipList = this.internships;

  }

  logout() {
    localStorage.removeItem('currentUser');
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  AddInternshipFirebase() {
    let internship: Internship = new Internship();
    internship.companyName = "Company 2";
    internship.description = "Data Entry";
    internship.jobScope = "Data Analyst";
    internship.seats = 1;
    var newPostRef = this.database.ref('internships').push();
    newPostRef.set(internship);
  }




  readInternshipsDashboard(path: string, callbacks: (internObs: Observable<Internship[]>) => any) {
    let interns: Internship[] = [];
    let intern: Internship;
    this.database.ref(path).once('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
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
