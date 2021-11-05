import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { UserComponent } from '../user/user.component';
import { BankdashboardComponent } from '../bankdashboard/bankdashboard.component';
import { TransactionComponent } from '../transaction/transaction.component';
import { TopItemsComponent } from '../top-items/top-items.component';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../_services/';
import { of } from 'rxjs';
import { Internship } from '../_models/internship';
import * as firebase from 'firebase'
import { Observable } from 'rxjs/Observable';
import { DataParamService } from '../_services/data-param.service';
import { Subject } from 'rxjs';
import { FirebaseService } from '../_services/firebase.service';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    client: boolean = false;
    admin: boolean = false;
    customer: boolean = false;
    private database : firebase.database.Database;
    private startAt: Subject<string> = new Subject<string>();
    private inputFieldVal: any;
    lastKeyTime: number = 0;
    private internships: Internship[];

    constructor(private router: Router,
        private route: ActivatedRoute,
        public AuthenticationService: AuthenticationService,
        private dataParamService: DataParamService,
        private firebaseService: FirebaseService) {
        this.database = firebase.database();
        this.searchFirebase();
     }

    ngOnInit() {


        if (localStorage.getItem("currentUserType") == "client") {
            console.log("current user " + localStorage.getItem("currentUserType"))
            this.client = true;
        }
        else if (localStorage.getItem("currentUserType") == "admin") {
            console.log("current user " + localStorage.getItem("currentUserType"))

            this.admin = true;
        }
        else if (localStorage.getItem("currentUserType") == "customer") {
            console.log("current user " + localStorage.getItem("currentUserType"))

            this.customer = true;
        }


    }

    ngDoCheck() {

    }

    readInternshipsDashboard(path : string, callbacks: (internObs : Observable<Internship[]>) => any) {
        let interns : Internship[] = [];
        let intern : Internship;
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
        
    }
    
    //Auto complete.
    searchFirebase() {
        this.startAt.subscribe(start => {
            if (start != "") {
                this.firebaseService.searchInternship(start, (interns) => {
                    interns.subscribe(internships => {
                        if (internships !== undefined && internships.length != 0 && this.inputFieldVal != "") {
                            console.log("adding" + internships + "lmao");

                            this.internships = internships;
                        }
                    });
                });
            } else {
                console.log("clearing" + this.internships);

                this.internships = [];
            }

        });
    }

    //Real-time input updates
    searchKey($event) {
        let q: string = $event.target.value;
        if ($event.timeStamp - this.lastKeyTime > 200 || q == "") {
            q = q.toLowerCase();
            this.startAt.next(q);
            this.inputFieldVal = q;
            // this.endAt.next(q+"\uf8ff");
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
        console.log(this.internships);
        this.redirectSearchList();
    }


    redirectSearchList() {
        this.router.navigateByUrl('/searchlist').then(value => {
            this.dataParamService.changeMessage(this.internships);}
        );
    }


    redirectMyApplications() {
        this.router.navigateByUrl('/my-applications');
    }

    redirectMySchedule() {
        this.router.navigateByUrl('/my-schedule');
    }

    redirectTopItems() {
        this.router.navigateByUrl('/top-items');
    }

    redirectHome() {
        this.router.navigateByUrl('/home');
    }

    redirectContactUs() {
        this.router.navigateByUrl('/contact-us')
    }

    redirectAboutUs() {
        this.router.navigateByUrl('/about-us');
    }
    
    redirectResearch() {
        this.router.navigateByUrl('/research');
    }
    
    redirectGateBooking() {
        this.router.navigateByUrl('/user-details');
    }

    redirectStudentFormUpload() {
        this.router.navigateByUrl('/user-details');
    }

    redirectUser() {
        this.router.navigateByUrl('/user');
    }

    redirectMyItems() {
        this.router.navigateByUrl('/my-items');
    }

    redirectUserInterest() {
        this.router.navigateByUrl('/user-interests');
    }

    redirectUserSolutions() {
        this.router.navigateByUrl('/user-solutions');
    }

    redirectClientSolutions() {
        this.router.navigateByUrl('/client-solutions');
    }

    redirectGenerateUserAPIKey() {
        this.router.navigateByUrl('/generate-api-user');
    }

    redirectGenerateClientAPIKey() {
        this.router.navigateByUrl('/generate-api-client');
    }

    redirectUserDetails() {
        this.router.navigateByUrl('/user-details');
    }
    
    redirectMakeTransaction() {
        this.router.navigateByUrl('/test');
    }
    
    redirectPastTransaction() {
        this.router.navigateByUrl('/bankdashboard');
    }

    redirectUpload() {
        this.router.navigateByUrl('/form-upload');
    }
    
    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentUserType');
        localStorage.removeItem('apiKey');
        this.router.navigate(['/login']);
    }

}
