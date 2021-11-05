import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { Employer } from '../../_models/employer';

@Component({
  selector: 'app-employer-details',
  templateUrl: './employer-details.component.html',
  styleUrls: ['./employer-details.component.scss']
})
export class EmployerDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  
  currentEmployer: Employer;
  ngOnInit() {
    /** 
    this.route.queryParams
      .filter(params => params.order)
      .subscribe(params => {
        console.log(params); // {order: "popular"}

        this.parameters = params.order;
        console.log(this.parameters); // popular
      });

      console.log("Init")
      console.log(this.parameters)
    */
   /** 
    this.route.queryParams
      .filter(params => params.order)
      .subscribe(params => {
        console.log(params); // {order: "popular"}

        this.order = params.order;
        console.log(this.order); // popular
      });
    */

    this.route.queryParams.subscribe(params => {
      console.log(params)  
      //this.name = params['name'];
      this.currentEmployer = new Employer();
      this.currentEmployer.companyName = params['companyName'];
      this.currentEmployer.phone = params['phone'];
      this.currentEmployer.location = params['location'];
      this.currentEmployer.id = params['id'];
        //this.param2 = params['param2'];
    });
    //this.name = this.route.snapshot.paramMap.get("name");
    //console.log(this.name)
  }

}
