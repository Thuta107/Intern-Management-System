import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {userDetails} from '../_models/index';
import {userDetailsService} from '../_services/index';
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
  selector: 'app-gate-booking',
  templateUrl: './gate-booking.component.html',
  styleUrls: ['./gate-booking.component.scss']
})
    
export class GateBookingComponent implements OnInit {
    displayedColumns: string[] = ['aircraft', 'flightno', 'airport', 'gate', 'dept', 'arr', 'actions'];
    dataSource = ELEMENT_DATA;
    userDetails: userDetails = new userDetails()
    constructor(private UserDetailsService: userDetailsService,
        private router: Router,
        public dialog: MatDialog) { }

    ngOnInit() {
    }

    newUserDetails(): void {
        this.userDetails = new userDetails();
    }

    addDetails() {
        this.UserDetailsService.addUserDetail(this.userDetails).subscribe(response => {} );
        this.openDialog('');
        this.router.navigateByUrl('');


    }
    
    removeEntry() {
        console.log("running");
        this.dataSource = this.dataSource.slice(1);
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
    }
  

}
