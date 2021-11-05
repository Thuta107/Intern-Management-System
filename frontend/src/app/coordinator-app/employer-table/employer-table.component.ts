import { Component, OnInit } from '@angular/core';
import { Employer } from '../../_models/employer';
import { FirebaseEmployerService } from '../../_services/firebase-employer.service';
import {MatTableModule} from '@angular/material/table';

const DEMO_EMPLOYERS = [
  {'name': 'Emp1', 'location': 'PJ'},
  {'name': 'Emp2', 'location': 'KL'},
  {'name': 'Emp3', 'location': 'Klang'}
];


@Component({
  selector: 'app-employer-table',
  templateUrl: './employer-table.component.html',
  styleUrls: ['./employer-table.component.scss']
})

export class EmployerTableComponent implements OnInit {

  //employers: Employer[];
  employers = DEMO_EMPLOYERS;

  columns: String[] = ['name', 'location']

  constructor() { }

  ngOnInit() {
    //this.getEmployers();
  }

  getEmployers() {
    /** 
    let temp_employers = this.employerService.readEmployer();
    this.employers = [];
    for (let entry of temp_employers){
      this.employers.push(entry.data);
    }
    */
   //this.employers = DEMO_EMPLOYERS;
  }
}
