import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SignupComponent } from './signup/signup.component';
import { TeamsComponent } from './teams/teams.component';
import { MeetinginfoComponent } from './meetinginfo/meetinginfo.component';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'nav',component:NavComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'sidebar',component:SidebarComponent},
  {path:'signup',component:SignupComponent},
  {path:'teams',component:TeamsComponent},
  {path:'home',component:HomeComponent},
  {path:'booking/:id',component:BookingComponent},
  {path:'calendar',component:CalendarComponent},
 {path:'meetinginfo',component:MeetinginfoComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
