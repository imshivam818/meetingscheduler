import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MeetinginfoComponent } from './meetinginfo/meetinginfo.component';
import { BookingComponent } from './booking/booking.component';
import { NavComponent } from './nav/nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MeetingRoutingModule } from './meeting-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoomsComponent } from './rooms/rooms.component';




@NgModule({
  declarations: [
    SidebarComponent,
    MeetinginfoComponent,
    BookingComponent,
    NavComponent,
    DashboardComponent,
    RoomsComponent


  ],
  imports: [
    CommonModule,
    MeetingRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    
  ]
})
export class MeetingModule { }
