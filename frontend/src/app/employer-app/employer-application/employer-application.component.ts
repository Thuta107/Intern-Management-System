import { UploadFirebaseService } from './../../_services/upload-firebase.service';
import { FirebaseEmployerService } from './../../_services/firebase-employer.service';
import { Component, OnInit } from '@angular/core';
import { Application } from './../../_models/application';
import {RouterModule, Router} from '@angular/router';
import { studentDetails } from './../../_models/studentDetails';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-employer-Applicationtion',
  templateUrl: './employer-application.component.html',
  styleUrls: ['./employer-application.component.css']
})
export class EmployerApplicationComponent implements OnInit {

  // database.get Array of posted jobs
  public acceptedStudentArray = Array<{key: string, data: Application, studentId: string}>();
  public applyingStudentArray = Array<{key: string, data: Application, studentId: string}>();
  public internshipName;
  public internshipSeats;

  public data:Object[] = [{type: "Pending Applicants ", status: false},{type: "Accepted Applicants ", status: true}];
  public selectedLevel;
  public shortlistvalue = this.data[0];
  public selectedIndex: number = -1;
  
  constructor(private router: Router, private employerService: FirebaseEmployerService, private fileService: UploadFirebaseService) {
    
    let internshipId = localStorage.getItem('internshipId');
    this.acceptedStudentArray = this.employerService.getAcceptedStudents(internshipId);
    this.applyingStudentArray = this.employerService.getApplyingStudents(internshipId);

    this.internshipName =localStorage.getItem('internshipName');
    this.internshipSeats = localStorage.getItem('internshipSeats');
    
    console.log('current acceptedStudentArray: ', this.acceptedStudentArray);
  }

  ngOnInit() {
    this.selectedLevel = this.data[0];
  }
  
  redirectJobList() {
    this.router.navigateByUrl('employer/employer-joblist');
  }
  
  
  acceptStudent(index){
    if(this.internshipSeats-this.acceptedStudentArray.length <= 0){
        alert("Seats for "+this.internshipName+ " is already full!");
    }
    else{
        this.employerService.acceptStudent(this.applyingStudentArray[index].key);
        this.applyingStudentArray.splice(index, 1);
        this.acceptedStudentArray = this.employerService.getAcceptedStudents(localStorage.getItem('internshipId'));
        console.log("after accept student: ", this.applyingStudentArray);
    }
  }
  
  
  undoAcceptStudent(index){
    this.employerService.undoAcceptStudent(this.acceptedStudentArray[index].key);
    this.acceptedStudentArray.splice(index, 1);
    this.applyingStudentArray = this.employerService.getApplyingStudents(localStorage.getItem('internshipId'));
    console.log("after undoAcceptStudent student: ", this.applyingStudentArray);
  }
  
  
  
  rejectStudent(index){
    this.employerService.rejectStudent(this.applyingStudentArray[index].key);
    this.applyingStudentArray.splice(index, 1);
    console.log("after reject student: ", this.applyingStudentArray);
  }
  
  viewShortlist(){
    //this.changeShortlist = true;
  }

  viewApplied(){
    //this.changeShortlist = false;
  }

  // Following is used for navigating between Applied and Accepted Applicants
  selected(){
    this.shortlistvalue = this.selectedLevel;
  }

  changeSelection(index: number){
    if(index === this.selectedIndex){
      this.selectedIndex = -1;
    }
    else
    {
      this.selectedIndex = index;
    }
  }

  viewAcceptedResume(index: string){
   this.fileService.getSpecificFilefromStorage(this.acceptedStudentArray[index].studentId);    
  }

  viewApplyingResume(index: string){
    this.fileService.getSpecificFilefromStorage(this.applyingStudentArray[index].studentId);    
   }
}


