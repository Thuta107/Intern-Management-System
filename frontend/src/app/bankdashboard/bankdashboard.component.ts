import { Component, OnInit } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Transactions} from '../_models/transaction';
import {UsersService} from '../_services/index';


@Component({
  selector: 'app-bankdashboard',
  templateUrl: './bankdashboard.component.html',
  styleUrls: ['./bankdashboard.component.scss']
})
export class BankdashboardComponent implements OnInit {
    transaction: Transactions = new Transactions()
    senderacc:String ="";
    
    transactions = [];
    
    
    constructor(private userService: UsersService,private http: HttpClient,private router: Router) { }
    newUser(): void {
        this.transaction = new Transactions();
    }
    ngOnInit() {
        
       this.senderacc = localStorage.getItem('currentUser');
        
        console.log(this.senderacc);
        (this.userService.getAllTransaction(this.senderacc)).subscribe(response => 
        { this.transactions = response;
        console.log(this.transactions)
            
         });
        
        

}
  }
    
    


