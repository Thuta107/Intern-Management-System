import { Component, OnInit } from "@angular/core";
import { UploadFileService } from "../_services/index";
import { Users } from "../_models/index";
import { UploadFirebaseService } from "../_services/upload-firebase.service";
import { weekRows } from "../_models/weekrows";

let months: weekRows[] = [
  { period: 1, name: "Monthly Report 1", status: "Submission Due", link: "" },
  { period: 2, name: "Monthly Report 2", status: "Submission Due", link: "" },
  { period: 3, name: "Monthly Report 3", status: "Submission Due", link: "" },
  { period: 4, name: "Monthly Report 4", status: "Submission Due", link: "" },
  { period: 5, name: "Monthly Report 5", status: "Submission Due", link: "" },
  { period: 6, name: "Monthly Report 6", status: "Submission Due", link: "" }
];

@Component({
  selector: "app-monthly-reports",
  templateUrl: "./monthly-reports.component.html"
})
export class MonthlyReportsComponent implements OnInit {
  displayedColumns: string[] = ["month", "name", "status", "submit"];
  dataSource = months;

  selectedFiles: FileList;
  currentFileUpload: File;

  progress: { percentage: number } = { percentage: 0 };
  listFiles: any[] = [];
  currentUser: string;
  private id: string;

  constructor(
    private uploadService: UploadFileService,
    private user: Users,
    private uploadFirebaseService: UploadFirebaseService
  ) {}
  ngOnInit() {
    this.id = localStorage.getItem("currentUserID");
    this.uploadFirebaseService.getFilesFromStorage(
      this.id + "/monthly",
      months,
      mapObs => {
        mapObs.subscribe(monthResults => {
          this.dataSource = monthResults;
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
      this.id + "/monthly" + "/mnth" + (i + 1),
      (url, name) => {
        if (url == null) {
          this.uploadFirebaseService.pushFileToStorage(
            this.id + "/monthly" + "/mnth" + (i + 1),
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
            this.id + "/monthly" + "/mnth" + (i + 1) + "/" + name,
            () => {
              this.uploadFirebaseService.pushFileToStorage(
                this.id + "/monthly" + "/mnth" + (i + 1),
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
}
