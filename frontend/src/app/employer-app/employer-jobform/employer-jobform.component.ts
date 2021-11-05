import { Employer } from './../../_models/employer';
import { Internship } from './../../_models/internship';
import { FirebaseEmployerService } from './../../_services/firebase-employer.service';
import { getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import {RouterModule, Router} from '@angular/router';
import { BsDropdownToggleDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-employer-jobform',
  templateUrl: './employer-jobform.component.html',
  styleUrls: ['./employer-jobform.component.css']
})
export class EmployerJobFormComponent {
  
  types = ['School of Arts and Social Sciences','School of Business','School of Engineering','School of Information Technology','School of Pharmacy','School of Science'];
  
  selected: String = '';

  constructor(private router: Router, private employerService: FirebaseEmployerService)
  {}

  redirectHome() {
    this.router.navigateByUrl('employer/employer-joblist');
  }

  selectOption(para: String){
    this.selected = para;
  }

  onAddPost(form: NgForm){

      let newInternship = new Internship;

      // Getting companyName from local Storage
      this.employerService.getEmployerName(localStorage.getItem("currentUserID"), returnVal => {

        // Assigning all jobs
        newInternship.companyName = returnVal;
        newInternship.seats = form.value.seats;
        newInternship.description = form.value.jobDescription;
        newInternship.jobScope = form.value.jobTitle;
        newInternship.acceptedStudents = 0;
        newInternship.appliedStudents = 0;
        newInternship.companyId = localStorage.getItem("currentUserID");

        this.employerService.AddInternship(newInternship);
        localStorage.removeItem("currentUserName");
        this.redirectHome();
      
        console.log("Form submitted");
      });
  }
}