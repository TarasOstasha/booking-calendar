import { Component, OnInit, Input, Inject, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgForm, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { ThemePalette } from '@angular/material/core';

import { CalendarView, CalendarEvent } from 'angular-calendar';

import { startOfDay } from 'date-fns';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { AppointmentService } from '../../services/appointment.service';
import { MatStepper } from '@angular/material/stepper';

import * as moment from 'moment';
import { from } from 'rxjs';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.less'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class CalendarComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper; // for custom change stepper angular material
  appointmentForm!: FormGroup; // main form group


  timeFlag: boolean = false;
  calendarFlag: boolean = false;
  faCheck = faCheck;

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  isEditable = true;


  constructor(
    private _formBuilder: FormBuilder,
    private dialog: MatDialog,
    private _appointment: AppointmentService,
    private changeDetectorRef: ChangeDetectorRef
    //public dialogRef: MatDialogRef<DialogComponent>,
    //@Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.appointmentForm = this._formBuilder.group({
      userName: ['', [Validators.required]],
      userPhone: ['', [Validators.required]],
      userEmail: ['', [Validators.required]]
    });
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    //this.events;

  }


  services = [
    {
      id: 1, type: '1 Bedroom', duration: 1, price: 119.99, additional: [
        { type: '1 BATHROOM', duration: 1, price: 110, completed: false, color: 'primary', },
        { type: '2 BATHROOM', duration: 2, price: 140, completed: false, color: 'primary', },
        { type: '3 BATHROOM', duration: 3, price: 180, completed: false, color: 'primary', },
        { type: '4 BATHROOM', duration: 4, price: 200, completed: false, color: 'primary', },
        { type: '5 BATHROOM', duration: 5, price: 220, completed: false, color: 'primary', }
      ]
    },
    {
      id: 2, type: '2 Bedroom', duration: 2, price: 149.99, additional: [
        { type: '1 BATHROOM', duration: 1, price: 110, completed: false, color: 'primary', },
        { type: '2 BATHROOM', duration: 2, price: 140, completed: false, color: 'primary', },
        { type: '3 BATHROOM', duration: 3, price: 180, completed: false, color: 'primary', },
        { type: '4 BATHROOM', duration: 4, price: 200, completed: false, color: 'primary', },
        { type: '5 BATHROOM', duration: 5, price: 220, completed: false, color: 'primary', }
      ]
    },
    {
      id: 3, type: '3 Bedroom', duration: 2.30, price: 179.99, additional: [
        { type: '1 BATHROOM', duration: 1, price: 110, completed: false, color: 'primary', },
        { type: '2 BATHROOM', duration: 2, price: 140, completed: false, color: 'primary', },
        { type: '3 BATHROOM', duration: 3, price: 180, completed: false, color: 'primary', },
        { type: '4 BATHROOM', duration: 4, price: 200, completed: false, color: 'primary', },
        { type: '5 BATHROOM', duration: 5, price: 220, completed: false, color: 'primary', }
      ]
    },
    {
      id: 4, type: '4 Bedroom', duration: 4, price: 210, additional: [
        { type: '1 BATHROOM', duration: 1, price: 110, completed: false, color: 'primary', },
        { type: '2 BATHROOM', duration: 2, price: 140, completed: false, color: 'primary', },
        { type: '3 BATHROOM', duration: 3, price: 180, completed: false, color: 'primary', },
        { type: '4 BATHROOM', duration: 4, price: 200, completed: false, color: 'primary', },
        { type: '5 BATHROOM', duration: 5, price: 220, completed: false, color: 'primary', }
      ]
    },
    { id: 5, type: 'Commercial Cleaning(2 Hours)', duration: 2, price: 160 },
    { id: 6, type: 'Commercial Cleaning(4 Hours)', duration: 4, price: 320 }
  ]


  //showFiller = false;

  saveAppointments(form: NgForm) {
    console.log(form.value)
  }


  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  setView(view: CalendarView) {
    this.view = view;
  }

  //events: CalendarEvent[] = [];
  events: CalendarEvent[] = [
    // {
    //   start: startOfDay(new Date()),
    //   title: 'First event',
    // },
    // {
    //   start: startOfDay(new Date()),
    //   title: 'Second event',
    // },
    // {
    //   start: startOfDay(new Date()),
    //   title: 'dsfdsffds event',
    // },
    // {
    //   start: new Date(2021,2,5,10,0,0,0),
    //   title: 'testing',
    // },
    // {
    //   start: startOfDay(new Date(2021, 4, 2, 11, 55, 0)),
    //   title: 'testing',
    // },
    {
      start: new Date(2021, 2, 2, 15, 0, 0),
      end: new Date(2021, 2, 2, 16, 0, 0),
      title: 'duration 1 hour',
    },
  ]


  schedule: any;

  dialogValue: any;
  sendValue: any;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    //console.log(date, events);
    const fullYear = new Date(date).getFullYear();
    const month = new Date(date).getMonth();
    const day = new Date(date).getDate();

    this.timeFlag = true;
    //this.dialog.open(DialogComponent)

    //let x=this.adminService.dateFormat(date)
    //this.openAppointmentList(x)
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      data: { pageValue: this.sendValue }
    });
    //console.log(dialogRef)
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result.data.options.hour, result.data.options.period)
      let hour = Number(result.data.options.hour.split(':').shift());
      if (result.data.options.period == 'pm') hour += 12;

      this.events.push({
        start: new Date(fullYear, month, day, hour, 0, 0),
        //title: this.mainService,
        title: 'Not Available'
      });


      const observable = from(this.events);
      observable.subscribe(item => {
        console.log(item);
      })
      
      // create date time
      console.log('The dialog was closed', result.data.options);
      //this.dialogValue = result.data;
      //if (result) this.stepper.selectedIndex = 1;  // move to the next stepper menu
      this.dialogValue = dialogRef;
      //console.log('The dialog was closed', this.dialogValue );

    }, error => { console.log(error) });

  }



  // checkboxData() {
  //   this.timeFlag = false;
  // }

  bookCalendar() {
    this.calendarFlag = !this.calendarFlag;
  }



  // appointment data from calendar;
  timeSchedule: any;
  // mainService
  mainService!: string;
  chooseMainService(service: string) {
    this.mainService = service;
  }
  // additionalServices
  additionalServicesArray: any = [];
  additionalServices(event: any) {
    this.additionalServicesArray.push(event.source.value);
    console.log(this.additionalServicesArray);
  }

  // grab all data in one object from form
  userAppointment() {
    const dataUserForm = {
      service: this.mainService,
      additionalService: this.additionalServicesArray,
      appointmentTime: this.timeSchedule,
      userName: this.appointmentForm.value.userName,
      userPhone: this.appointmentForm.value.userPhone,
      userEmail: this.appointmentForm.value.userEmail
    }
    console.log(dataUserForm);
  }


// *** start accordion expansion-panel 
  currentOpenedItemId: number = 1;
  public handleOpened(item: any): void {
    this.currentOpenedItemId = item.id;
  }
// *** end accordion expansion-panel 

}
