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
      }
    )

  }
}
