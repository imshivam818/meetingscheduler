import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;
  submitted = false;
  room_id:string='';
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
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.room_id=this.route.snapshot.params['id'];
    this.bookingForm = this.fb.group({
      // meetingDetails: ['', [Validators.required]],
      meeting_id: ['', [Validators.required]],
      room_id : [this.room_id],
      name: ['', [Validators.required]],
      start_time: ['', [Validators.required]],
      end_time: ['', [Validators.required]],
      purpose: ['', [Validators.required]],
      meeting_date: ['', [Validators.required]],
      userId:[this.userId],
    });
    
  }

  get bookingFormcontrols() {
    return this.bookingForm.controls;

  }
  booking() { 
    const data = this.bookingForm.value;
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
