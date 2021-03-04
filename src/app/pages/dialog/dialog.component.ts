import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';
import { Subject } from 'rxjs';
 

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.less']
})
export class DialogComponent implements OnInit {
  @Output() submitClicked = new EventEmitter<any>();

  timeFlag: boolean = false;
  timeAppointmentForm!: FormGroup; //= new FormGroup({});
 //= new FormGroup({});

 fromPage: any;
 fromDialog: any;
  constructor(
              private _formBuilder: FormBuilder, 
              private _appointment: AppointmentService, 
              public dialogRef: MatDialogRef<DialogComponent>,
              private dialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public data: any
              ) { this.fromPage = data.pageValue;}

  ngOnInit() {
    this.timeAppointmentForm = this._formBuilder.group({
      //options: ['', [Validators.required]]
      options: ['' , [Validators.required]]
    });
    
  }

  

  times = [
    { hour: '6:00', period: 'am' },
    { hour: '7:00', period: 'am' },
    { hour: '9:00', period: 'am' },
    { hour: '10:00', period: 'am' },
    { hour: '11:00', period: 'am' },
    { hour: '12:00', period: 'pm' },
    { hour: '1:00', period: 'pm' },
    { hour: '2:30', period: 'pm' },
    { hour: '3:00', period: 'pm' },
    { hour: '4:30', period: 'pm' },
    { hour: '5:00', period: 'pm' },
    { hour: '6:30', period: 'pm' },
    { hour: '7:00', period: 'pm' },
    { hour: '8:00', period: 'pm' },
    { hour: '9:00', period: 'pm' },
    { hour: '10:00', period: 'pm' },
    { hour: '11:00', period: 'pm' },
    { hour: '12:00', period: 'am' },
    { hour: '1:00', period: 'am' },
    { hour: '2:00', period: 'am' },
    { hour: '3:00', period: 'am' },
    { hour: '4:00', period: 'am' },
    { hour: '5:00', period: 'am' }
  ];
  
  
  
  
  
  chooseAppointmentTime() {
    //console.log('hello', this.timeAppointmentForm.value)
    this.fromDialog = this.timeAppointmentForm.value;
    this.dialogRef.close({ event: 'close', data: this.fromDialog });
  }
  
  onClose() {
    this.dialogRef.close();
    //this.dialogRef.close();
    //return false;
    
  }

  checkTime(event: any) {
    console.log(event)
  }
}
