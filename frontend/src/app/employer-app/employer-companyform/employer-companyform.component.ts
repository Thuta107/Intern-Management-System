import { FirebaseEmployerService } from './../../_services/firebase-employer.service';
import { Employer } from './../../_models/employer';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators, FormGroup } from '@angular/forms';
import {RouterModule, Router} from '@angular/router';
import { BsDropdownToggleDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-employer-companyform',
  templateUrl: './employer-companyform.component.html',
  styleUrls: ['./employer-companyform.component.css']
})
export class EmployerCompanyformComponent implements OnInit{

  public employer : Employer;
  public formGroup : FormGroup;
  
  constructor(private router: Router, private employerService: FirebaseEmployerService)
  {
  }
  
  ngOnInit() {

    this.employer = this.employerService.getSpecificEmployer(localStorage.getItem('currentUserID'));

    this.formGroup = new FormGroup({
      email: new FormControl(this.employer.email, Validators.required),
      name: new FormControl(this.employer.companyName, Validators.required),
      phone: new FormControl(this.employer.phone, Validators.required),
      location: new FormControl(this.employer.location, Validators.required) 
    });
  } 

  redirectAllPostedJobs() {
    this.router.navigateByUrl('employer/employer-joblist');
  }

  onAddPost(){

      let profileinfo = new Employer;
      profileinfo.email = this.employer.email;
      profileinfo.companyName = this.employer.companyName;
      profileinfo.phone = this.employer.phone;
      profileinfo.location = this.employer.location;

      this.employerService.editEmployerFirebase(this.employer.id, profileinfo);
      this.redirectAllPostedJobs();
  }

}
