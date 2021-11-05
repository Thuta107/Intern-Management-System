import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { Internship } from '../_models/internship';

@Injectable({
  providedIn: 'root'
})
export class DataParamService {

  private messageSource = new Subject<Internship[]>();
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(internshipList: Internship[]) {
    console.log("neww " + internshipList);
    this.messageSource.next(internshipList)
  }
}
