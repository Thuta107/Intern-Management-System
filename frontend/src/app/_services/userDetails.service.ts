import {Injectable} from '@angular/core';
import {userDetails} from '../_models/userDetails';

import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';


@Injectable()
export class userDetailsService {
    private baseUrl = environment.apiUrl + 'userDetails';
    
    constructor(private http: HttpClient,
        private userDetails: userDetails) { }



    addUserDetail(userDetailsData: userDetails): Observable<any> {
        let getHeaders: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        console.log(this.baseUrl);
        return this.http.post<any>(this.baseUrl + '/create/', userDetailsData, { headers: getHeaders });
  }

  

}