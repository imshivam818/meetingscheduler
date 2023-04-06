import { Component, OnInit,Inject } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import Swal from 'sweetalert2';
import { ActivatedRoute,Router } from '@angular/router';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  room_id:string='';
  meeting_id:string='';
  name:string='';
  start_time:string='';
  end_time:string='';
  purpose:string='';
  meeting_date:string='';
  //varibles always in camel case

  userId:any=localStorage.getItem('userId');
  //array banyaa
  // public bookingdetails:any=[];

  meetingform=true;
  


 
  constructor(private apiService:ApiServiceService,private router:Router,private route:ActivatedRoute,
     ) { }

  ngOnInit(): void {
    console.log(this.route);
    this.room_id=this.route.snapshot.params['id'];
    // this.bookingForm.patchValue(this.data);
  }

  bookingForm(){
    const data = {
      name: this.name,
      room_id: this.room_id,
      meeting_id: this.meeting_id,
      start_time:this.start_time,
      end_time:this.end_time,
      purpose:this.purpose,
      meeting_date:this.meeting_date,
      userId:this.userId
    };
    console.log(data);
  
    // localStorage.setItem('userId', response[0].id);
          // alert(localStorage.getItem('userId'));
          // localStorage.removeItem('userId');
    // console.log('user data for meetingdetails', data);
    // {
      // if (this.bookingForm){

    // if(this.data){
    //   this.apiService.editMeetingDetails(this.data.id,this.bookingForm.value).subscribe({
    //     next: (val: any) => {
    //       alert('Employee Updated successfully');   
    //       // this._dialogRef.close(true);
    //     },
    //     error: (err: any) => {
    //       console.error(err); 
    //     },
    //   });

    // }
    // else
    this.apiService.meetingdetails(data).subscribe(
      (response:any) => {
        console.log(response,"response")
          // this.message = 'User signup successfully!';
          // this.meetingform = false;
          // this.messages = true;
          this.router.navigate(['/','dashboard']);
          Swal.fire('Meeting booked  SUCCESSFULLYYYYY')
      },
      (error: any) => {
        console.log(error);
        Swal.fire("Error Occured");
      }
    );
  }


}
