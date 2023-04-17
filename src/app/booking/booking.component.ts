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

  ngOnInit(): void {
    this.getDate();

    this.room_id=this.route.snapshot.params['id'];
    this.bookingForm = this.fb.group({
      // meetingDetails: ['', [Validators.required]],
      meeting_id: ['',],
      room_id : [this.room_id],
      name: ['', [Validators.required]],
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

      this.bookingForm.patchValue({
        meeting_id:this.bookingFormDetails.meeting_id,
        name:this.bookingFormDetails.name,
        start_time:this.bookingFormDetails.start_time,
        end_time:this.bookingFormDetails.end_time,
        meeting_date: this.formatDateAndTime(this.bookingFormDetails.meeting_date)  ,
        purpose:this.bookingFormDetails.purpose

      });
    //   this.bookingForm.patchValue({name:this.bookingFormDetails.name});
    //   this.bookingForm.patchValue({start_time:this.bookingFormDetails.start_time});
    //   this.bookingForm.patchValue({end_time:this.bookingFormDetails.end_time});
    //   this.bookingForm.patchValue({meeting_date:this.bookingFormDetails.meeting_date});
    //   this.bookingForm.patchValue({purpose:this.bookingFormDetails.purpose});
    
  }
  formatDateAndTime(date:any) {
     let newDate = new Date(date)
     let currentDate = (newDate.getDate() < 10) ? `0${newDate.getDate()}` : newDate.getDate();
     let Month = (newDate.getMonth() + 1 < 10) ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1;
     let Year = newDate.getFullYear()    
    return `${Year}-${Month}-${currentDate}`
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
    // console.log(year)
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
            this.router.navigate(['/', 'dashboard']);        
          } else{
            Swal.fire(response.result);
            this.showListing = true;

          }
        }
      )
    // }
    // else
     
    // {
    // this.apiService.meetingdetails(data).subscribe(
    //   (response: any) => {
    //     console.log(response, 'response');
    //     this.router.navigate(['/', 'dashboard']);
    //     Swal.fire('Meeting Booked  Successfully');        
    //   },
    //   (error: any) => {
    //     console.log(error);
    //     Swal.fire('Error Occured');
    //   }
    // );
    // }
  }
  }
}