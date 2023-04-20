import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { response } from 'express';
// import { DialogRef, DIALOG_DATA } from '@angular/core';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;
  submitted = false;
  room_id:string='';
  @Input() bookingFormDetails: any;
  public datePipe = new DatePipe('en-Us');
  public buttonName = ''



  // room_id:any= this.route.snapshot.params['room_id'];
  // meetingDetails: any=this.route.snapshot.params['meeting'];
  //varibles always in camel case;

  userId: any = localStorage.getItem('userId');
  public showListing : boolean = false
  public heading = "Create your Meeting"
  //array banyaa
  // public bookingdetails:any=[];
  // meetingform=true;

  constructor(
    private apiService: ApiServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public datepipe: DatePipe

    // @Inject(DIALOG_DATA) public data: any
  ) {}
  // public minTime: Date = new Date("6/01/2022 12:14:05")

  ngOnInit(): void {
    // console.log(this.minTime);
    // this.getTime1(null);
    this.getDate();
    this.room_id=this.route.snapshot.params['id'];
    this.bookingForm = this.fb.group({
      meeting_id: ['',],
      room_id : [this.room_id],
      name: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(25),Validators.pattern('[a-zA-Z ]*')]],
      start_time: ['', [Validators.required]],
      end_time: ['', [Validators.required]],
      purpose: ['', [Validators.required]],
      meeting_date: ['', [Validators.required]],
      userId:[this.userId],
    });
    console.log(this.room_id);
console.log(this.bookingFormDetails);
if(this.room_id == undefined){
  this.buttonName = 'Update'
  this.editinfo();
}
else{
  this.buttonName = 'Submit'
}
  }
 

  
    

  editinfo(){
// console.log(this.formatDateAndTime(this.bookingFormDetails.meeting_date));
      this.heading = 'update meeting details';
      this.bookingForm.patchValue({
        meeting_id:this.bookingFormDetails.meeting_id,
        name:this.bookingFormDetails.name,
        start_time:this.bookingFormDetails.start_time,
        end_time:this.startTimeFormat(this.bookingFormDetails.end_time),
        meeting_date: this.formatDateAndTime(this.bookingFormDetails.meeting_date),
        purpose:this.bookingFormDetails.purpose

      });

  }
  formatDateAndTime(date:any) {
     let newDate = new Date(date);
     let currentDate = (newDate.getDate() < 10) ? `0${newDate.getDate()}` : newDate.getDate();
     let Month = (newDate.getMonth() + 1 < 10) ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1;
     let Year = newDate.getFullYear()
     let hours = newDate.getHours()
     let minutes = newDate.getMinutes()
     let seconds = newDate.getSeconds()
    return `${Year}-${Month}-${currentDate}`
    // return `${hours}-${minutes}`
   }
   startTimeFormat(data:any){
    let date = new Date();
     console.log(date)
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${hours}:${minutes}:${seconds}`


    this.minDate =  hours + ":" + minutes + ":" + seconds  ;
    // console.log(this.minTime);

  }



  minDate:any = "";
  getDate(){
    var date:any = new Date();
    // console.log(date)
    var toDate:any = date.getDate();
    // console.log(toDate);
    if(toDate < 10){
      toDate = '0' + toDate;
    }
    var month  = date.getMonth() + 1;
    if(month < 10){
      month = '0' + month;
    }
    // console.log(month);
    var year = date.getFullYear();
    this.minDate = year + "-" + month + "-" + toDate;
    // console.log(this.minDate);
  }


  endTime(event:any){
    console.log(event.target.value);
    
  }



minTime:any = "6/01/2022 09:00:00";
changeStartTimeEvent(value:any){
  // console.log(.target.value);
  let todate:any = new Date().getTime();
  let selectdate:any = new Date(value).getTime();
  if(todate>selectdate){
    alert("you can't choose previous date and time")
  }

}
end_Time:any = "6/01/2022 18:00:00";
changeEndTimeEvent(value:any){
  // console.log(.target.value);
  let todate:any = new Date().getTime();
  let selectdate:any = new Date(value).getTime();
  if(todate<selectdate){
    alert("you can't choose past date and time")
  }
}

getTime(){ 
const startTime = new Date("6/01/2022 12:14:05");
const endTime = new Date("6/01/2022 13:14:05");
console.log(startTime);
console.log(endTime);

const startT = startTime.getTime();
// console.log(startT);
const endT = endTime.getTime();
// console.log(endT);
if(startT<endT){
console.log("d1 is great d2")
this.bookingFormDetails.value("this is ")
alert("you can't select previious date")
}
// else
// if(startT >= endT){
//   console.log("d1 is less d2") 
// }
// else{
//   console.log("d1 = d2")
// }


    // console.log(date)
    // const hours = date.getHours();
    // const minutes = date.getMinutes();
    // const seconds = date.getSeconds();

    // this.minTime =  hours + ":" + minutes + ":" + seconds  ;
    // console.log(this.minTime);

}

maxTime:any = "09:00:00";
getEndTime(tag:any = null){
  // console.log(event.target.value);

console.log(tag?.target.value)


var hms =tag?.target.value;   // your input string
var a = hms.split(':'); // split it at the colons

// minutes are worth 60 seconds. Hours are worth 60 minutes.
var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 ; 
console.log(seconds);
}


  get bookingFormcontrols() {
    return this.bookingForm.controls;

  }

  oncancel(){
    this.bookingForm.reset;
    this.buttonName="submit";
    this.router.navigate(['/','dashboard']);
  }
  booking() {
    const data = this.bookingForm.value;
    console.log(data)
    console.log('user data for meetingdetails', data);
    if(this.bookingForm.valid){
    // if(data.meeting_id){
      this.apiService.meetingdetails(data).subscribe(
        (response:any) => {
          // console.log(response,'response');
          console.log(response)
          Swal.fire(response.result);
          if(response.result == 'Meeting booked successfully'){
            Swal.fire(response.result);
            this.router.navigate(['/', 'meetinginfo']);        
          } else{
            Swal.fire(response.result);
            this.showListing = true;

          }
        }
      )
  
  }
  }
}
