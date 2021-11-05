import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generate-api-client',
  templateUrl: './generate-api-client.component.html',
  styleUrls: ['./generate-api-client.component.css']
})
export class GenerateApiClientComponent implements OnInit {

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
