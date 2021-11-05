import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import { Observable } from "rxjs/Observable";
import { environment } from "../../environments/environment";
import { Url } from "url";
import { of } from "rxjs";
import { weekRows } from "../_models/weekrows";

@Injectable({
  providedIn: "root"
})
export class UploadFirebaseService {
  public storage;
  constructor() {
    // // Set the configuration for your app
    // // TODO: Replace with your app's config object
    // var firebaseConfig = {
    //   apiKey: '<your-api-key>',
    //   authDomain: '<your-auth-domain>',
    //   databaseURL: '<your-database-url>',
    //   storageBucket: 'gs://fit3170-intership.appspot.com'
    // };
    // firebase.initializeApp(firebaseConfig);
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebase);
    }
    // Get a reference t1o the storage service, which is used to create references in your storage bucket
    this.storage = firebase.storage().ref();

    //Test
    // Create a reference under which you want to list

    //TSET
  }

  pushFileToStorage(
    fileType: String,
    file: File,
    callback: (internObs: Url) => any
  ) {
    console.log("filetype" + fileType);
    var uploadTask = this.storage.child(fileType + "/" + file.name).put(file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      function(snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
        }
      },
      function(error) {
        // Handle unsuccessful uploads
      },
      function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log("File available at", downloadURL);
          callback(downloadURL);
        });
      }
    );
  }

  getFilesFromStorage(
    path,
    holder: weekRows[],
    callback: (weekObs: Observable<weekRows[]>) => any
  ) {
    console.log("Screw this firebase");
    // Create a reference under which you want to list
    // Find all the prefixes and items.
    this.storage
      .child(path)
      .listAll()
      .then(res => {
        res.prefixes.forEach((folderRef: Url) => {
          var folderStr = String(folderRef);
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
          console.log(folderStr + " folder ref");
          let prefix: string = folderStr.substring(
            folderStr.lastIndexOf("/") + 1
          );
          console.log(path + "/" + prefix + " shortened"); //Prefix is week or month with number.

          //leaf node (one level deeper)

          this.storage
            .child(path + "/" + prefix)
            .listAll()
            .then(result => {
              result.items.forEach((itemRef: Url) => {
                // All the items under listRef.
                let result: string = String(itemRef);
                result = result.substring(result.lastIndexOf("/") + 1); //File name. (leaf node)
                let weekNo: number = Number(prefix.substring(4)); //Week or month number.
                console.log(result + "item ref");
                let index = weekNo - 1;
                holder[index].name = result;
                holder[index].status = "Submitted";
                holder[index].period = weekNo;
                this.storage
                  .child(path + "/" + prefix + "/" + result)
                  .getDownloadURL()
                  .then(function(downloadURL) {
                    holder[index].link = downloadURL;
                  });
                console.log(prefix + " asd " + weekNo + "asd");
              });
            });
        });
        callback(of(holder));
      })
      .catch(function(error) {
        // Uh-oh, an error occurred!
      });
  }

  getFileFromStorage(
    path: string,
    callback: (downloadUrl: Url, name: string) => any
  ) {
    this.storage
      .child(path)
      .listAll()
      .then(res => {
        console.log("resu " + res);
        let folderReference: string = "";
        res.items.forEach((folderRef: Url) => {
          console.log(" folder reffff " + folderRef);
          var folderStr = String(folderRef);
          folderReference = folderStr;

          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
          console.log(folderStr + " folder ref");
          let filename: string = folderStr.substring(
            folderStr.lastIndexOf("/") + 1
          );
          this.storage
            .child(path + "/" + filename)
            .getDownloadURL()
            .then(function(downloadURL) {
              callback(downloadURL, filename);
            });
        });
        if (folderReference == "") {
          console.log("folder ref empty, no resume");
          callback(null, "");
        }
      });
  }

  deleteFromStorage(path: string, callback: () => any) {
    var desertRef = this.storage.child(path);

    // Delete the file
    desertRef
      .delete()
      .then(function() {
        callback();
        // File deleted successfully
      })
      .catch(function(error) {
        // Uh-oh, an error occurred!
      });
  }

  getSpecificFilefromStorage(id: string) {
    this.storage
      .child(id)
      .child("resume")
      .listAll()
      .then(function(res) {
        res.items.forEach(itemRef => {
          itemRef.getDownloadURL().then(link => {
            window.open(link, "_blank");
          });
        });
      })
      .catch(function(error) {
        alert("No resume found");
        // Uh-oh, an error occurred!
      });

    /*
    var fileRef = this.storage.child(id+"/resume");
    fileRef.getDownloadURL().then(function(path: string)
    { 
      window.open(path, '_blank');
    });
    */
  }
}
