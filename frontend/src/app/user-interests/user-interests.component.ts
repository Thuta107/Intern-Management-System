import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';

import {AddUserInterestDialogComponent} from '../add-user-interest-dialog/add-user-interest-dialog.component';
@Component({
  selector: 'app-user-interests',
  templateUrl: './user-interests.component.html',
  styleUrls: ['./user-interests.component.css']
})
export class UserInterestsComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
  }


  travelLocations() {
    this.openDialog(' Add your Favourite Travel Locations')
  }

  hobbiesAndInterests() {
    this.openDialog(' Add your Hobbies and Interests')
  }
  
  foodInterests() {
    this.openDialog('Add your Food Interests')
  }
  
  generalInterests() {
    this.openDialog('Add your General Interests')
  }

  test() {
    this.openDialog('Hobbies and Interests');
  }

  openDialog(str) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    console.log(str);
    dialogConfig.data = {
      title: str
    };


    const dialogRef = this.dialog.open(AddUserInterestDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => console.log("Dialog output:", data)
    );
  }



}
