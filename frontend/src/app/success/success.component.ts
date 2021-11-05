import {Component, OnInit, Inject} from '@angular/core';
import {FormGroup, FormBuilder, ReactiveFormsModule} from '@angular/forms';

import {MAT_DIALOG_DATA, MatDialogRef, MatDialogContent} from "@angular/material";

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  form: FormGroup;
  description: string;
  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<SuccessComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.description = data.title;
    console.log(this.description);
  }

  ngOnInit() {
    //this.dialogRef.updateSize('80%','80%');
    this.form = this.fb.group({
      description: [this.description, []],

    });
    console.log(this.description);
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
