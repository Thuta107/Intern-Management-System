import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/';
import { MatGridList, MatGridTile, MatGridListModule } from '@angular/material';
import * as firebase from 'firebase'
import { Internship } from '../_models/internship';
import { of, Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { FirebaseService } from '../_services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private database: firebase.database.Database;
  public internObs: Observable<Internship[]>;
  private startAt: Subject<string> = new Subject<string>();
  private inputFieldVal: any;
  lastKeyTime: number = 0;
  private internships: Internship[];
  private internshipList: Internship[];
  
  constructor(private router: Router,
    private route: ActivatedRoute,
    public authenticationService: AuthenticationService, private zone: NgZone, private firebaseService: FirebaseService) {
    this.database = firebase.database();


  }

  ngOnInit() {
  }
}
