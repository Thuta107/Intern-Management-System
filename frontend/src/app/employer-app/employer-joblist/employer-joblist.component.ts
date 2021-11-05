import { FirebaseEmployerService } from './../../_services/firebase-employer.service';
import { Component, OnInit } from '@angular/core';
import { Internship } from './../../_models/internship';
import {RouterModule, Router} from '@angular/router';

@Component({
  selector: 'app-employer-joblist',
  templateUrl: './employer-joblist.component.html',
  styleUrls: ['./employer-joblist.component.css']
})
export class EmployerJoblistComponent implements OnInit {

  // database.get Array of posted jobs
  public jobArray = Array<{key: string, data: Internship}>();
  
  constructor(private router: Router, private employerService: FirebaseEmployerService) {
    
    this.jobArray = this.employerService.readInternships(localStorage.getItem("currentUserID"));
    console.log('current jobArray: ', this.jobArray);
  }

  ngOnInit() {
  }
  
  
  removeInternship(index) {
    this.employerService.delInternship(this.jobArray[index].key);
    this.jobArray.splice(index, 1);
    console.log("after remove: ", this.jobArray);
  }
  
  
  
  redirectApplication(j) {
    localStorage.setItem('internshipId', j.data.id);
    localStorage.setItem('internshipName', j.data.jobScope);
    localStorage.setItem('internshipSeats', j.data.seats);
    this.router.navigateByUrl('employer/employer-application');
  }

}
