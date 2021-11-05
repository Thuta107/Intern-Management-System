import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generate-api-user',
  templateUrl: './generate-api-user.component.html',
  styleUrls: ['./generate-api-user.component.css']
})
export class GenerateApiUserComponent implements OnInit {

  secure: boolean = false;
  showAPI: boolean = false;
  apiString: string;
  constructor() { }

  ngOnInit() {
  }
  
  addSecurityCode() {
    this.secure = true;
    
  }
  
  getAPIKey() {
    this.apiString = localStorage.getItem('apiKey');
    console.log(this.apiString);
    this.showAPI = true;
  }

}
