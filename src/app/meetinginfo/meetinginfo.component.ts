import { Component, Input, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { response } from 'express';
import { Router } from '@angular/router';
import { state } from '@angular/animations';
import Swal from 'sweetalert2';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { NgConfirmService } from 'ng-confirm-box';
@Component({
  selector: 'app-meetinginfo',
  templateUrl: './meetinginfo.component.html',
  styleUrls: ['./meetinginfo.component.css'],
})
export class MeetinginfoComponent implements OnInit {
  [x: string]: any;
  public meetingDetails: any = [];
  public meeting_id: any = [];
  public redirectBooking : boolean = false;
  public bookingFormDetails : any;
  public bookingData : any;
  public room_id:any;



  constructor(private apiservice: ApiServiceService, private router: Router, private ConfirmService:NgConfirmService) {}
  ngOnInit(): void {
    this.getalldetails();

  }
  getalldetails() {
    this.apiservice.getalldata().subscribe((response: any) => {
      // console.log(response);
      this.meetingDetails = response;
    });
  }
   deletedetails(meeting_id: string, meetingName : string){


      this.ConfirmService.showConfirm("Are you sure to delete Meeting:" +meetingName,
       () => {
        //your logic if Yes clicked

        this.apiservice.deletemeeting(meeting_id).subscribe(
          (response: any) => {
            // if(confirm("Are you sure?")){
            //   // Swal.fire('Deleted successfully');
            // }
            // this.meetingDetails=this.meetingDetails.filter((meeting:any)=>meeting.meeting_id!==meeting_id);
            this.getalldetails();

          },
          (error: any) => {
            console.log('error aya delte kiya to', error);
          }
        );
      },
      () => {
        //yor logic if No clicked
      })

  }



    // editMeeting(room_id:any){
      // this.apiservice.editMeetingDetails.subscribe(
      //   (response:any)=>{
      //     console.log(response);
      //   const editMeetingDetails={
      //     name: 'New Meeting Name',
      //     start_time: '12:00:00',
      //     end_time: '13:00:00',
      //     meeting_date: '2022-05-01',
      //     purpose: 'New Meeting Purpose'
      //   };
        // this.apiservice.editMeetingDetails(room_id,editMeetingDetails).subscribe(
        //   (response:any)=>{
        //     this.getalldetails();
        //     const updatedetials={...response,...editMeetingDetails};
        //      this.router.navigate(['booking',room_id],{state:{data:updatedetials}});
        //   },
        // (error:any)=>{
        //   console.log("error in updating",error);
        //       }
    //   );
    // },
    // (error:any)=>{
    //   console.log(error);
    // }
    // );

  editMeeting(meeting: any) {
    this.redirectBooking = true;
    this.bookingData = meeting;

  }
}
