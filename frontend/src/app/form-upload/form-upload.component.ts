import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpResponse, HttpEventType } from "@angular/common/http";
import { UploadFileService } from "../_services/index";
import { Users } from "../_models/index";
import { UploadFirebaseService } from "../_services/upload-firebase.service";

import { file_model } from "../_models/index";
import { Headers, Http, Response } from "@angular/http";
import * as FileSaver from "file-saver";
import { weekRows } from "../_models/weekrows";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { map } from "rxjs/operators";
import { ViewChild } from "@angular/core";

let weeks: weekRows[] = [
  { period: 1, name: "Weekly Report 1", status: "Submission Due", link: "" },
  { period: 2, name: "Weekly Report 2", status: "Submission Due", link: "" },
  { period: 3, name: "Weekly Report 3", status: "Submission Due", link: "" },
  { period: 4, name: "Weekly Report 4", status: "Submission Due", link: "" },
  { period: 5, name: "Weekly Report 5", status: "Submission Due", link: "" },
  { period: 6, name: "Weekly Report 6", status: "Submission Due", link: "" },
  { period: 7, name: "Weekly Report 7", status: "Submission Due", link: "" },
  { period: 8, name: "Weekly Report 8", status: "Submission Due", link: "" },
  { period: 9, name: "Weekly Report 9", status: "Submission Due", link: "" },
  { period: 10, name: "Weekly Report 10", status: "Submission Due", link: "" },
  { period: 11, name: "Weekly Report 11", status: "Submission Due", link: "" },
  { period: 12, name: "Weekly Report 12", status: "Submission Due", link: "" }
];

@Component({
  selector: "app-form-upload",
  templateUrl: "./form-upload.component.html",
  styleUrls: ["./form-upload.component.css"]
})
export class FormUploadComponent implements OnInit {
  displayedColumns: string[] = ["week", "name", "status", "submit"];
  dataSource = weeks;

  selectedFiles: FileList;
  currentFileUpload: File;

  progress: { percentage: number } = { percentage: 0 };
  private baseUrl = "http://localhost:8080/api";
  listFiles: any[] = [];
  currentUser: string;
  private id: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private uploadService: UploadFileService,
    private user: Users,
    private http: Http,
    private uploadFirebaseService: UploadFirebaseService
  ) {}

  ngOnInit() {
    this.id = localStorage.getItem("currentUserID");
    this.uploadFirebaseService.getFilesFromStorage(
      this.id + "/weekly",
      weeks,
      mapObs => {
        mapObs.subscribe(weekResults => {
          this.dataSource = weekResults;
        });
      }
    );

    //this.getAllImageFiles();
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    var user = JSON.parse(currentUser["_body"]);
    this.currentUser = user.username;
  }

  selectFile(event, i) {
    const file = event.target.files.item(0);
    console.log(file);
    /* check for invalid format
    if (file.type.match('text.*') || file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
    */

    this.selectedFiles = event.target.files;
    console.log("i: " + i);

    this.upload(i, file.name);
  }

  upload(i, filename) {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);

    this.uploadFirebaseService.getFileFromStorage(
      this.id + "/weekly" + "/week" + (i + 1),
      (url, name) => {
        if (url == null) {
          this.uploadFirebaseService.pushFileToStorage(
            this.id + "/weekly" + "/week" + (i + 1),
            this.currentFileUpload,
            downloadUrl => {
              console.log("Download url: " + downloadUrl);
              this.dataSource[i].link = String(downloadUrl);
              this.dataSource[i].name = filename;
            }
          );
        } else {
          console.log("Monthly report already submitted, deleting " + name);
          this.uploadFirebaseService.deleteFromStorage(
            this.id + "/weekly" + "/week" + (i + 1) + "/" + name,
            () => {
              this.uploadFirebaseService.pushFileToStorage(
                this.id + "/weekly" + "/week" + (i + 1),
                this.currentFileUpload,
                downloadUrl => {
                  console.log("Download url: " + downloadUrl);
                  this.dataSource[i].link = String(downloadUrl);
                  this.dataSource[i].status = "Submitted";
                  this.dataSource[i].name = filename;
                }
              );
            }
          );
        }
      }
    );
    // this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {

    //     console.log('File is completely uploaded!');

    // });

    this.selectedFiles = undefined;
  }

  download() {
    //this.uploadService.downloadAllFiles();
  }

  // getAllImageFiles(): Promise<string[]> {

  //     var currentUser = JSON.parse(localStorage.getItem('currentUser'));
  //     var user = JSON.parse(currentUser['_body']);

  //     return this.http.post(this.baseUrl + '/list-all-image-files-byusername', user.username).toPromise()
  //     .then(response => {this.listFiles = response.json();
  //                        console.log(this.listFiles);
  //                        this.isDataLoadedImage = true;
  //                        return response.json();})
  //     .catch(this.handleError);

  // }

  // getAllTextFiles(): Promise<string[]> {

  //     var currentUser = JSON.parse(localStorage.getItem('currentUser'));
  //     var user = JSON.parse(currentUser['_body']);

  //     return this.http.post(this.baseUrl + '/list-all-text-files-byusername', user.username).toPromise()
  //     .then(response => {this.listFiles = response.json();
  //                        console.log(this.listFiles);
  //                        this.isDataLoadedText = true;
  //                        return response.json();})
  //     .catch(this.handleError);

  // }

  // downloadImage() {
  //     var saveAs: any;
  //     let file = new Blob(['hello world'], { type: 'text/csv;charset=utf-8' });
  //     FileSaver.saveAs(file, 'helloworld.txt')
  // }

  // deleteFile(filename,username) {
  //     let formdata: FormData = new FormData();
  //     formdata.append('filename', filename);
  //     formdata.append('username',username);
  //     return this.http.post(this.baseUrl + '/delete-file-by-filename/' , formdata).toPromise()
  //         .then(response => location.reload())
  //         .catch(this.handleError);
  // }

  // private handleError(error: any): Promise <any> {
  //     console.error('Error occured at file upload.',error);
  //     return Promise.reject(error);
  // }

  // test() {
  //     console.log(this.listFiles);
  //     console.log(this.listFiles[0]);
  // }

  // showfiles() {
  //     //this.uploadedFile = this.uploadService.getFiles();
  //     //console.log(this.uploadedFile);
  // }
}
