import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'signup',component:SignupComponent},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {
    path: 'meeting',
    loadChildren: () =>
      import('./meeting/meeting.module').then((m) => m.MeetingModule),
  },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
