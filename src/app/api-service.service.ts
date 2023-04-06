import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//const baseUrl = 'http://localhost:3000/login';



@Injectable({
  providedIn: 'root'
})

export class ApiServiceService {
  constructor(private http:HttpClient) {}
  login(data:any) {
    // console.log(data,"data login")
    return this.http.post('http://localhost:3000/login', data);
  }

  signup(data:any) {
    console.log(data,"data signup")
    return this.http.post('http://localhost:3000/signup', data);
  }

  roomid(){
    return this.http.get('http://localhost:3000/roomdetails');
  }
 
  meetingdetails(data:any) {
    return this.http.post('http://localhost:3000/meetingdetails', data);
  }

  getalldata(){
    return this.http.get('http://localhost:3000/details');
  }
  deletemeeting(room_id:string){
    return this.http.delete(`http://localhost:3000/details/${room_id}`);
  }
  // getMeetingDetailById(room_id:String){
  //   return this.http.get(`http://localhost:3000/details/${room_id}`);

  // }
  editMeetingDetails(room_id:string,meetingDetails:any){
    return this.http.put(`http://localhost:3000/details/${room_id}`,meetingDetails);
  }


 
}

