import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-user-solutions',
    templateUrl: './user-solutions.component.html',
    styleUrls: ['./user-solutions.component.css']
})
export class UserSolutionsComponent implements OnInit {
    private baseUrl = environment.apiUrl;
    constructor() { }

    ngOnInit() {
    }

    test() {
        console.log('test');
    }

    getFallSensorApk() {
        window.location.href = environment.apiUrl +'downloadFile/fall-sensor.apk';
    }

    getChatBotApk() {
        window.location.href = environment.apiUrl + 'downloadFile/chatbot.apk';
    }
}
