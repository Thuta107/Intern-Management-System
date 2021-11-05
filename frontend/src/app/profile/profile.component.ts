import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "../_services/firebase.service";
import { Internship } from "../_models/internship";
import { UploadFirebaseService } from "../_services/upload-firebase.service";
import { Url } from "url";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  placeholder = "123";
  color = "primary";
  mode = "determinate";
  value = 0;
  start = new Date(2019, 7, 24); // August 24, 2019
  end = new Date(2019, 11, 12); // December 12, 2019

  public filename: string;
  selectedFiles: FileList;
  currentFileUpload: File;

  progress: { percentage: number } = { percentage: 0 };
  listFiles: any[] = [];
  currentUser: string;
  private id: string;

  public internship: Internship;
  downloadUrl: Url;
  resumeUrl: Url;

  constructor(
    private firebaseService: FirebaseService,
    private uploadFirebaseService: UploadFirebaseService
  ) {}

  ngOnInit() {
    this.id = localStorage.getItem("currentUserID");

    let today: Date = new Date();
    // Convert to unix values timestamp values
    var startDate = this.start.getTime();
    var endDate = this.end.getTime();
    var todayDate = today.getTime();

    // Get the total possible timestamp value
    var total = endDate - startDate;

    // Get the current value
    var current = todayDate - startDate;

    // Get the percentage
    this.value = (current / total) * 100;
    document.getElementById("progress-percentage").innerHTML =
      Math.round(this.value) + "%";
    // this.firebaseService.getCurrentInternship((internshipObs) => {
    //   internshipObs.subscribe((internship) => {
    //     this.internship = internship;
    //   })
    // })

    this.uploadFirebaseService.getFileFromStorage(
      this.id + "/resume",
      (downloadUrl, name) => {
        console.log("new");
        console.log(downloadUrl + "fetching url resume");
        this.downloadUrl = downloadUrl;
        document
          .getElementById("file-link")
          .setAttribute("href", String(this.downloadUrl));

        this.filename = name;
      }
    );
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
    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadFirebaseService.getFileFromStorage(
      this.id + "/resume",
      (url, name) => {
        if (url == null) {
          this.uploadFirebaseService.pushFileToStorage(
            this.id + "/resume",
            this.currentFileUpload,
            downloadUrl => {
              console.log("Download url: " + downloadUrl);
              this.downloadUrl = downloadUrl;
              document
                .getElementById("file-link")
                .setAttribute("href", String(this.downloadUrl));
              this.filename = filename;
            }
          );
        } else {
          console.log("Resume already submitted, deleting " + name);
          this.uploadFirebaseService.deleteFromStorage(
            this.id + "/resume/" + name,
            () => {
              this.uploadFirebaseService.pushFileToStorage(
                this.id + "/resume",
                this.currentFileUpload,
                downloadUrl => {
                  console.log("Download url: " + downloadUrl);
                  this.downloadUrl = downloadUrl;
                  console.log(String(this.downloadUrl) + "asdfin");
                  document
                    .getElementById("file-link")
                    .setAttribute("href", String(this.downloadUrl));

                  this.filename = filename;
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
