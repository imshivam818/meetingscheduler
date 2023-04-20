import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { ApiServiceService } from '../../api-service.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  room_id:string="";
  room_name:string="";
  room_desc:string="";
  room_details:any[]=[];

  constructor(private apiservice:ApiServiceService) { }

  getroomid(){
    this.apiservice.roomid().subscribe(
      // console.log(this.room_details);
      (response:any)=>{
        console.log('this is my result');
        this.room_details=response;
      }
    );
      
  }
  ngOnInit(): void {
    

  }

}
