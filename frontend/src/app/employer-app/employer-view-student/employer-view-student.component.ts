import { Component, OnInit } from '@angular/core';
import { FirebaseEmployerService } from './../../_services/firebase-employer.service';
import { studentDetails } from './../../_models/studentDetails';

@Component({
  selector: 'app-view-student',
  templateUrl: './employer-view-student.component.html',
  styleUrls: ['./employer-view-student.component.css']
})
export class ViewStudentComponent implements OnInit {

  // database.get Array of student detail
  public studentDetailArray = Array<{key: string, data: studentDetails}>();
  public selectedIndex: number = -1;
  
  constructor(private employerService: FirebaseEmployerService) { 

    this.studentDetailArray = this.employerService.readstudentDetails();
    console.log('current studentDetailArray: ', this.studentDetailArray);
  }
  ngOnInit() {
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

}
