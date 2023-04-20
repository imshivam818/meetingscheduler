import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from '../meeting/booking/booking.component';
import { DashboardComponent } from '../meeting/dashboard/dashboard.component';
import { NavComponent } from './nav/nav.component';
// import { SidebarComponent } from './sidebar/sidebar.component';
import { MeetinginfoComponent } from '../meeting/meetinginfo/meetinginfo.component';
import { RoomsComponent } from './rooms/rooms.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'booking/:id', component: BookingComponent },
      { path: 'meetinginfo', component: MeetinginfoComponent },
      {path:'dashboard',component:DashboardComponent},
      {path:'rooms',component:RoomsComponent}
    ],
  },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingRoutingModule { }
