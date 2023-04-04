import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import swal from 'sweetalert2';
import { FormBuilder,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  signupform!:FormGroup;
  submitted = false;
  constructor(private apiService: ApiServiceService,
            private router:Router,
            private fb:FormBuilder) { }
  ngOnInit(){
    this.signupform=this.fb.group({
      //now here we need to have two fields 
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]]

    });
  }
  get signupformcontrol() {
    return this.signupform.controls;
  }
  submitForm(){
    const data =
     this.signupform.value;
    console.log('user data for signin', data);
    this.apiService.signup(data).subscribe(
      (response:any) => {
        console.log(response,"response")
          this.router.navigate(['/','login']);
          this.submitted=true;
          if(this.signupform.invalid){
            swal.fire('Form is invalid');
          }
          swal.fire('Signup SUCCESSFULLYYYYY')
      },
      (error: any) => {
        console.log(error);
        swal.fire("Please fill the INFO");
      }
    );
  }

}
