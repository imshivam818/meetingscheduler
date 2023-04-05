import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { response } from 'express';
@Component({
  selector: 'app-meetinginfo',
  templateUrl: './meetinginfo.component.html',
  styleUrls: ['./meetinginfo.component.css']
})
export class MeetinginfoComponent implements OnInit {
  
 
  public meetingDetails:any=[];
    constructor(private apiservice:ApiServiceService) { }

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
  editMeeting(room_id:string){
    this.apiservice.getMeetingDetailById(room_id).subscribe(
      (response:any)=>{
        console.log(response);
      const editMeetingDetails={
        name: 'New Meeting Name',
        start_time: '2022-05-01T12:00:00Z',
        end_time: '2022-05-01T13:00:00Z',
        meeting_data: 'New Meeting Data',
        purpose: 'New Meeting Purpose'
      };
      this.apiservice.editMeetingDetails(room_id,editMeetingDetails).subscribe(
        (response:any)=>{
          console.log(response);
          
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
