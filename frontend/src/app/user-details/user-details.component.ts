import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {userDetails} from '../_models/index';
import {userDetailsService} from '../_services/index';
import { FirebaseService } from '../_services/firebase.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {SuccessComponent} from '../success/success.component';
import {MatTableModule} from '@angular/material/table';


export interface PeriodicElement {
  aircraft: string;
  flightno: string;
  airport: string;
  gate: string;
  dept: string;
  arr: string;
    
}

const ELEMENT_DATA: PeriodicElement[] = [
  {aircraft: 'AirAsia', flightno: 'AK138', airport: 'Kuala Lumpur International', gate: 'U38', dept: '11:38', arr: '14:16' },
  {aircraft: 'Qantas', flightno: 'QZ412', airport: 'Heathrow International', gate: 'U38', dept: '11:38', arr: '15:16' },
  {aircraft: 'TigerAir', flightno: 'LS312', airport: 'Sydney', gate: 'U38', dept: '11:38', arr: '16:45' },
  {aircraft: 'AmericanAirways', flightno: 'JD281', airport: 'John F Kennedy International', gate: 'U38', dept: '11:38', arr: '18:32' },
  {aircraft: 'Emirates', flightno: 'OP342', airport: 'Melbourne International', gate: 'U38', dept: '11:38', arr: '17:16' },
  {aircraft: 'Qatar', flightno: 'AH098', airport: 'Bangkok International', gate: 'U38', dept: '11:38', arr: '22:16' },
  {aircraft: 'British Airways', flightno: 'TY983', airport: 'Jakarta International', gate: 'U38', dept: '11:38', arr: '23:00' }

];

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

    userDetails: userDetails = new userDetails()
    constructor(private UserDetailsService: userDetailsService,
        private firebaseService: FirebaseService,
        private router: Router,
        public dialog: MatDialog) { }

    ngOnInit() {
    }

    newUserDetails(): void {
        this.userDetails = new userDetails();
    }

    addDetails() {
        this.UserDetailsService.addUserDetail(this.userDetails);
        this.firebaseService.addStudentDetails(this.userDetails);
        this.openDialog('');
        this.router.navigateByUrl('');


    }

    openDialog(str) {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        console.log(str);
        dialogConfig.data = {
            title: str
        };


        const dialogRef = this.dialog.open(SuccessComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(
            data => console.log("Dialog output:", data)
        );
    }s



}
