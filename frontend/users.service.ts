import { Injectable } from '@angular/core';
import { Users } from '../_models/users';
import { Transactions } from '../_models/index';
//import { Headers, Http, Response } from '@angular/http';
import { HttpClient,  HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import {environment} from '../../environments/environment';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ErrorComponent} from '../error/error.component';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class UsersService {
    private baseUrl = environment.apiUrl + 'users';

    
    constructor(private http: HttpClient,
        private users: Users,
        public dialog: MatDialog) { }


    createUser(usersData: Users): Observable<any> {
        let getHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
        return this.http.post<any>(this.baseUrl + '/create/', usersData, {headers: getHeaders});
    }
    
    createTransaction(usersData: Transactions): Observable<any> {
        let getHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
        return this.http.post<any>(this.baseUrl + '/transaction/', usersData, {headers: getHeaders});
    }

sendTextMessage(): Observable<any> {

        let getHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
       	return this.http.post<any>('http://192.213.136.213' + '/api/sendtextalert', {headers: getHeaders});
    }
}
    
    getAllTransaction(usersData: String): Observable<any> {
        let getHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
        console.log(usersData)
        return this.http.post<any>(this.baseUrl + '/transaction/record', usersData, {headers: getHeaders});
    }
    
    

    /*
    createUser(usersData: Users): Promise<any> {
        return this.http.post(this.baseUrl + '/create/', usersData)
            .toPromise().then(response => {

                console.log(response.json());
             
                    return response.json(); 
            })
    }
    

    private handleError(error: any): Observable<any> {
        //localStorage.setItem('Error', 'true');
       
        console.error('Error occured at users.', error);
        //return Promise.reject(error);
    }
    */





}
