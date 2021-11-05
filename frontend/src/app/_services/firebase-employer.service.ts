import { Employer } from './../_models/employer';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { of } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';
import { Internship } from './../_models/internship';
import { Application } from './../_models/application';
import { studentDetails } from './../_models/studentDetails';
import { callbackify } from 'util';

@Injectable({
  providedIn: 'root'
})
export class FirebaseEmployerService {
  // Assign database reference to variables to simplify naming conventions
  public database : firebase.database.Database;
  private employerRef: firebase.database.Reference;
  private internshipRef: firebase.database.Reference;
  private applicationRef: firebase.database.Reference;
  private studentdetailsRef: firebase.database.Reference;
  

  constructor() {
    // Initialize the database references with values
    this.database = firebase.database();
    this.employerRef = this.database.ref('Employer');
    this.internshipRef = this.database.ref('internships');
    this.applicationRef = this.database.ref('Application');
    this.studentdetailsRef = this.database.ref('studentdetails');
  }

   
  /*
   * This function retrieves the respective Employer data with the matching key
   *
   * key:  a string which corresponds to the key in the database
   */
  getSpecificEmployer(key: string){
    let data = new Employer();

    /* 
     * Using the once function to take a snapshot (a record of that instance).
     * It then checks if the key exists or not. If the key exists, get the
     * corresponding data
     */
    this.employerRef.once('value', (snapshot) => {
      if (snapshot.child(key).exists()){
        data.id = snapshot.child(key).child('id').val();
        data.email = snapshot.child(key).child('email').val();
        data.companyName = snapshot.child(key).child('companyName').val();
        data.phone = snapshot.child(key).child('phone').val();
        data.location = snapshot.child(key).child('location').val();
      }
    })
    return data;
  }

  /*
   * This function retrieves the respective Employer name with the matching key
   *
   * key:       a string which corresponds to the key in the database
   * callback:  a value which can be used to do a function after the current function
   *            has finished executing. Primarily used for asynchronous functions
   */
  getEmployerName(key: string, callback){
    /*
     * Retrieve the snapshot of the current instance and checks if the key exists
     * or not. If it does, retrieve the employer name
     */
    this.employerRef.once('value').then(
      result => {
        if (result.child(key).exists()){
          callback(result.child(key).child('companyName').val());
        }
      }
    )
  }

  /*
   * This function updates the employer data with a new data submitted from a form
   *
   * key:     a string which corresponds to the key in the database
   * data:    an Employer data model which was submitted through a form
   */
  editEmployerFirebase(key: string, data: Employer) {

    /*
     * Using the update function to only change specific values instead of changing
     * the whole employer data.
     */
    this.employerRef.child(key).update({
      companyName: data.companyName,
      location: data.location,
      phone: data.phone
    })
  }

  /*
   * This function is used to push data to the employer collection when the user is
   * a new employer.
   * 
   * data: an Employer data model which is submitted through a form
   * password: a string used as a password to the account
   */
  registerEmployer(data: Employer, password: string){
    // A variable to check if the account exists or not
    let exist = false;
    let userId = localStorage.getItem('currentUserID');

    if (userId === null){
      // If userId === null, it doesn't exist. Create new user
      firebase.auth().createUserWithEmailAndPassword(data.email, password).then(
        result => {
          // Add the employer to the database
          data.id = result.user.uid;
          this.employerRef.child(data.id).set(data);
        },
        error => {
          // If there is an error, alert with the respective error messages
          if (error.code == 'auth/weak-password'){
            alert('The password is too weak.');
          } else if (error.code == 'auth/email-already-in-use'){
            alert('Email has already existed in our database.');
          } else if (error.code == 'auth/invalid-email'){
            alert('Email is invalid.');    
          } else {
            console.log(error.code);
            console.log(error.message);
          }
        })
    }
    else {
      // If there is userID in local storage, check if it exists as an employer or not
      this.employerRef.once('value', (snapshot) => {
        snapshot.forEach( (childSnapShot) => {
          if (snapshot.child(userId).exists()){
            exist = true;
            console.log('Username Exists')
          }
        })
  
        // If it does not exist as an employer
        if (exist == false){
          // Create new employer and add it to the database
          firebase.auth().createUserWithEmailAndPassword(data.email, password).then(
            result => {
              data.id = result.user.uid;
              this.employerRef.child(userId).set(data);
            },
            error => {
              // Alert with respective error messages
              if (error.code == 'auth/weak-password'){
                alert('The password is too weak.');
              } else if (error.code == 'auth/email-already-in-use'){
                alert('Email has already existed in our database.');
              } else if (error.code == 'auth/invalid-email'){
                alert('Email is invalid.');    
              } else {
                console.log(error.code);
                console.log(error.message);
              }
            })
        }
      })
    }
  }

  /*
   * This function is used to add Employer data to the database when a user
   * logs in as an employer through gmail and is a new employer
   */
  registerGmailEmployer(data: Employer){
    // Get the userID which was set in the localstorage by another service function
    let userId = localStorage.getItem('currentUserID');
    
    // If there is no userID when signing in through gmail
    if (userId === null){
      // Error, as there must be a userID when signing in through gmail
      alert("No userID, error occured")
    } else {
      // Add the employer data to the database with the same userID
      this.employerRef.child(userId).set(data);
    }
  }

  /*
   * This function checks if the Employer email exists or not
   * If it does, return true, if not, return false
   */
  getEmployerEmail(username: string, callback){
    // Retrieve a snapshot of the current instance
    this.employerRef.once('value', (snapshot) => {
      var exist = false;

      // For each employer
      snapshot.forEach((childSnapshot) => {
        // Check if email exists
        if (childSnapshot.child('email').val() == username){
          exist = true;
        }
      })

      // Return true/false
      callback(exist);
    });
  }

  /*
   * This function adds an internship to the database
   */
  AddInternship(data: Internship){
    let internshipKey = this.internshipRef.push(data).key;
    data.id = internshipKey;
    this.internshipRef.child(internshipKey).set(data);
  }
  

  /*
   * This function retrieves internship data from the database
   */
  readInternships(employerId: string) {
    let internships = Array<{key: string, data: Internship}>();
    this.internshipRef.once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        if (childSnapshot.child('companyId').val() == employerId){
          let internship = new Internship;
          let key = childSnapshot.key;
        
          internship.companyName = childSnapshot.child('companyName').val();
          internship.description = childSnapshot.child('description').val();
          internship.id = childSnapshot.child('id').val();
          internship.jobScope = childSnapshot.child('jobScope').val();
          internship.seats = childSnapshot.child('seats').val();
          internship.acceptedStudents = childSnapshot.child('acceptedStudents').val();
          internship.appliedStudents = childSnapshot.child('appliedStudents').val();

          let returnVal = {
            'key': key,
            'data': internship
          }

          internships.push(returnVal);
        }
      });
    });

    return internships;
  }
  

  /*
   * This function retrieves the students that have been accepted on a particular internship
   */
  getAcceptedStudents(internshipId: string) {
    let apps = Array<{key: string, data: Application, studentId: string}>();
    this.applicationRef.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) =>{
          let app = new Application;
          let key = childSnapshot.key;
          let id = childSnapshot.child('studentId').val();
        
          if (childSnapshot.child('internshipId').val() == internshipId && childSnapshot.child('status').val() == "Accepted"){
            app.id = childSnapshot.child('id').val();
            app.internshipId = childSnapshot.child('internshipId').val();
            this.database.ref('studentdetails').once('value', (snapshot) =>{
              snapshot.forEach((childSnapshot) =>{
                if(childSnapshot.key == id){
                  app.studentId = childSnapshot.child('username').val();
                }
                else{
                  app.studentId = "none";
                }
              });
            });
            app.status = childSnapshot.child('status').val();
            app.employerId = childSnapshot.child('employerId').val();
            app.details = childSnapshot.child('details').val();

            let returnVal = {
              'key': key,
              'data': app,
              'studentId': id
            }

            apps.push(returnVal);
          }
      });
    });

    return apps;
  }
  
  /*
   * This function retrieves the students that is applying for a particular internship
   */
  getApplyingStudents(internshipId: string) {
    let apps = Array<{key: string, data: Application, studentId: string}>();
    this.applicationRef.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) =>{
        let app = new Application;
        let key = childSnapshot.key;
        let id = childSnapshot.child('studentId').val();
        
          if (childSnapshot.child('internshipId').val() == internshipId && childSnapshot.child('status').val() == "Applying"){
            app.id = childSnapshot.child('id').val();
            app.internshipId = childSnapshot.child('internshipId').val();
            this.database.ref('studentdetails').once('value', (snapshot) =>{
              snapshot.forEach((childSnapshot) =>{
                if(childSnapshot.key == id){
                  app.studentId = childSnapshot.child('username').val();
                }
                else{
                  app.studentId = "none";
                }
              });
            });
            app.status = childSnapshot.child('status').val();
            app.employerId = childSnapshot.child('employerId').val();
            app.details = childSnapshot.child('details').val();

            let returnVal = {
              'key': key,
              'data': app,
              'studentId': id
            }

            apps.push(returnVal);
          }
      });
    });

    return apps;
  }
  
  /*
   * This function accepts a student's application for an internship
   */
  acceptStudent(key: string){
    this.applicationRef.child(key).child("status").set("Offered");
  }

  /*
   * This function undo the process of accepting a student's application
   */
  undoAcceptStudent(key: string){
    this.applicationRef.child(key).child("status").set("Applying");
  }
  
  /*
   * This function rejects a student's application for an internship
   */
  rejectStudent(key: string){
    this.applicationRef.child(key).child("status").set("Unoffered");
  }
  
  /*
   * This function removes an internship from the database
   */
  delInternship(key: string){
    this.internshipRef.child(key).remove();
  }
  
  /*
   * This function retrieves all student data
   */
  readstudentDetails() {
    let studentdetails = Array<{key: string, data: studentDetails}>();
    this.studentdetailsRef.once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
          let studentdetail = new studentDetails;
          let key = childSnapshot.key;
        
          studentdetail.studentID = childSnapshot.child('studentID').val();
          studentdetail.username = childSnapshot.child('username').val();
          studentdetail.age = childSnapshot.child('age').val();
          studentdetail.contact = childSnapshot.child('contact').val();
          studentdetail.generalInterest = childSnapshot.child('generalInterest').val();
          studentdetail.address = childSnapshot.child('address').val();
          studentdetail.race = childSnapshot.child('race').val();
          studentdetail.occupation = childSnapshot.child('occupation').val();
          studentdetail.religion = childSnapshot.child('religion').val();

          let returnVal = {
            'key': key,
            'data': studentdetail
          }

          studentdetails.push(returnVal);
      });
    });

    return studentdetails;
  }
  

  /*
   * This function retrieves the specific student name through student id
   */
  getStudentNameById(id, callbacks: (applicationObs : Observable<string>) => any) {
    this.studentdetailsRef.once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        if(childSnapshot.key == id){
            callbacks(of(childSnapshot.child('username').val()));
        }
        else{
            callbacks(of("none"));
        }
      });
    });
  }

}