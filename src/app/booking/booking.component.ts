import { Component, Inject, Input, OnInit} from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
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
  public buttonName = '';
  


  // room_id:any= this.route.snapshot.params['room_id'];
  // meetingDetails: any=this.route.snapshot.params['meeting'];
  //varibles always in camel case;

  userId: any = localStorage.getItem('userId');
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
      name: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(10),Validators.pattern("^[A-Za-z][A-Za-z0-9_]{7,29}$")]],
      start_time: ['', [Validators.required]],
      end_time: ['', [Validators.required]],
      purpose: ['', [Validators.required]],
      meeting_date: ['', [Validators.required]],
      userId:[this.userId],
    });
    

  
  console.log(this.bookingFormDetails);
  if(this.room_id == undefined){
  this.buttonName='Update'
  this.editinfo();
  }else{
  this.buttonName= 'submit'
  }
  }
 

  editinfo(){
      this.bookingForm.patchValue({meeting_id:this.bookingFormDetails.meeting_id,
        name:this.bookingFormDetails.name,
        start_time:this.bookingFormDetails.start_time,
        end_time:this.bookingFormDetails.end_time,
        meeting_date: this.formatDateAndTime(this.bookingFormDetails.meeting_date)  ,
        purpose:this.bookingFormDetails.purpose
      });
    }
  
  formatDateAndTime(date:any) {
     let newDate = new Date(date);
     let currentDate = (newDate.getDate() < 10) ? `0${newDate.getDate()}` : newDate.getDate();
     let Month = (newDate.getMonth() + 1 < 10) ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1;
     let Year = newDate.getFullYear()    
    return `${Year}-${Month}-${currentDate}`
   }

  minDate:any = "";
  getDate(){

    var date:any = new Date(); 
    // console.log(date);
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
    // console.log(year);
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
    // alert("@#$%^");
    const data = this.bookingForm.value;
    console.log(data)
    
    console.log('user data for meetingdetails', data);
    this.apiService.meetingdetails(data).subscribe(
      (response: any) => {
        console.log(response, 'response');
        this.router.navigate(['/', 'dashboard']);
        
        Swal.fire('Meeting booked  SUCCESSFULLYYYYY');
      },
      (error: any) => {
        console.log(error);
        Swal.fire('Error Occured');
      }
    );
  }
}
