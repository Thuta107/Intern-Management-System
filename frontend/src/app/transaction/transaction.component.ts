import { Component, OnInit } from '@angular/core';
import {Transactions} from '../_models/index';
import {UsersService} from '../_services/index';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
    transaction: Transactions = new Transactions()
    username: String = '';
    constructor(private userService: UsersService,
                private router: Router,
                private http: HttpClient) { }
    
  ngOnInit() {
      this.username = localStorage.getItem('currentUser');
  }
    
    registertransaction() {
        this.transaction.senderacc = localStorage.getItem('currentUser');
        
   
        
        (this.userService.createTransaction(this.transaction)).subscribe(response => {
            if (response.success == 0) {
//                throw Observable.throw(response);
            } else {
//                this.router.navigate(['/login']);
            }
            //this.router.navigate(['/login']);
        });

}
    
    }
