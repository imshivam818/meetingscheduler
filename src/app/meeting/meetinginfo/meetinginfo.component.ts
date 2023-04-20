import { Component, Input, OnInit } from '@angular/core';
import { ApiServiceService } from '../../api-service.service';
import { response } from 'express';
import { Router } from '@angular/router';
import { state } from '@angular/animations';
import { DashboardComponent } from '../dashboard/dashboard.component';
import Swal from 'sweetalert2';
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
 
  iseditmode:any=false;
  
  constructor(private apiservice: ApiServiceService, private router: Router) {}
  ngOnInit(): void {
    this.getalldetails();
  }
  getalldetails() {
    this.apiservice.getalldata().subscribe((response: any) => {
      // console.log(response);
      this.meetingDetails = response;
    });
  }
  deletedetails(meeting_id: string) {
    this.apiservice.deletemeeting(meeting_id).subscribe(
      (response: any) => {
        if(response){
          window.alert("your meeting will be delete now")
        }
        // this.meetingDetails=this.meetingDetails.filter((meeting:any)=>meeting.meeting_id!==meeting_id);
        this.getalldetails();
      },
      (error: any) => {
        console.log('error aya delte kiya to', error);
      }
    );
  }
  editMeeting(meeting: any) {
    this.iseditmode=true;
    this.redirectBooking = true;
    this.bookingData = meeting;
  }
}
