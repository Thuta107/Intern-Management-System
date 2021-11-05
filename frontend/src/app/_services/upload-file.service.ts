import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';
import { Headers, Http, Response} from '@angular/http';
import { Users } from '../_models/index';
import { Observable } from 'rxjs';



@Injectable()
export class UploadFileService {
    private baseUrl = 'http://localhost:8080/api';
    private user: Users;
    
    constructor(private http: HttpClient) { }
 
  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
 
    formdata.append('file', file);
    console.log("ok here");
    const req = new HttpRequest('POST', 'http://localhost:8080/api/uploadFile', formdata, {
      responseType: 'text'
    });
 
    return this.http.request(req);
  }
 
  getFiles(): Observable<any> {
    return this.http.get('/getallfiles');
  }
  /*  
  constructor(private http: Http,) {}
 
  pushFileToStorage(file: File): Promise<any> {
    
    let formdata: FormData = new FormData();
    
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(currentUser);
    var fileType = file.type;
    console.log(file.type);
    var user = JSON.parse(currentUser['_body']);
    console.log(user);
    formdata.append('file', file);
    formdata.append('username',user.username);
    formdata.append('fileType',fileType);
    
    return this.http.post(this.baseUrl + '/save-file/' , formdata).toPromise()
    .catch(this.handleError);
  }
 
  getFiles(): Promise<any> {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      var user = JSON.parse(currentUser['_body']);
      let string: string ='76479dd91dc55c2768ddccfc30a4fbf5--pikachu-halloween-costume-diy-halloween-costumes.jpg';
      console.log(string)
      return this.http.post(this.baseUrl + '/retrieve/imagefile',string,user.username).toPromise()
      .then(data => console.log(data))
      .catch(this.handleError);
  }
  
  
  downloadAllFiles(): Promise<any> {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      console.log(currentUser);
      
      var user = JSON.parse(currentUser['_body']);
      console.log(user.username);
      return this.http.post(this.baseUrl + '/retrieve/textfiles', user.username).toPromise()
      
      .catch(this.handleError);
  }
  
  
  
  private handleError(error: any): Promise <any> {
      console.error('Error occured at file upload.',error);
      return Promise.reject(error);
  }
  */
}