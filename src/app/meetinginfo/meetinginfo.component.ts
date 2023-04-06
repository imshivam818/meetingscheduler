import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { response } from 'express';
import { Router } from '@angular/router';
import { state } from '@angular/animations';
@Component({
  selector: 'app-meetinginfo',
  templateUrl: './meetinginfo.component.html',
  styleUrls: ['./meetinginfo.component.css']
})
export class MeetinginfoComponent implements OnInit {
  
  
 
  public meetingDetails:any=[];
    constructor(private apiservice:ApiServiceService,private router:Router) { }

  ngOnInit(): void {
    this.getalldetails();
    
  }
 

  getalldetails(){
    this.apiservice.getalldata().subscribe(
      (response:any)=>{

        // console.log(response);
        this.meetingDetails=response;
      }
    )
  }
  deletedetails(room_id:string){
    this.apiservice.deletemeeting(room_id).subscribe(
      (response:any)=>{
        window.alert(response);
        // this.meetingDetails=this.meetingDetails.filter((meeting:any)=>meeting.meeting_id!==room_id);
        this.getalldetails();
      },
      (error:any)=>{
        console.log('error aya delte kiya to',error);
      })
  }
  editMeeting(room_id :any){

console.log(room_id)
    return
    this.apiservice.getMeetingDetailById(room_id).subscribe(
      (response:any)=>{
        console.log(response);
      const editMeetingDetails={
        name: 'New Meeting Name',
        start_time: '12:00:00',
        end_time: '13:00:00',
        meeting_date: '2022-05-01',
        purpose: 'New Meeting Purpose'
      };
      this.apiservice.editMeetingDetails(room_id,editMeetingDetails).subscribe(
        (response:any)=>{
          this.getalldetails();
          const updatedetials={...response,...editMeetingDetails};
           this.router.navigate(['booking',room_id],{state:{data:updatedetials}});

        },
      (error:any)=>{
        console.log("error in updating",error);
            }
    );
   
  },
  (error:any)=>{
    console.log(error);
  }
  );
}
}
