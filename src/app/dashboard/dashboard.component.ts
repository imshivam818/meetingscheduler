import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { response } from 'express';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  room_id:string="";
  room_name:string="";
  room_desc:string="";
  public roomDetails:any=[];
  

  constructor(private apiservice:ApiServiceService,private router:Router) { }
  ngOnInit(): void {
    this.getroomid();
  }
  testfuntion(value:any){
    alert(value);
  }




  getroomid(){
    this.apiservice.roomid().subscribe(
      // console.log(this.room_details);
      (response:any)=>{
        // console.log(response);
        this.roomDetails=response;
      }
    );
      
  }


  bookmeeting(room_id:string){
    console.log('roomid',room_id);
    this.router.navigate(['/booking',room_id]);
  }
}
