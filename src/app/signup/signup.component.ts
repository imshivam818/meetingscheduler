import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import swal from 'sweetalert2';
import { FormBuilder,FormGroup,Validators,PatternValidator} from '@angular/forms';

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
      email:['',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password:['',[Validators.required,Validators.minLength(8),Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      cpassword:['',[Validators.required,Validators.minLength(8)]]

    },
    {
      //validators ka v small hona chaiye yha pe tbhi work krega  
      validators: this.mustMatch('password','cpassword')
    });
  }
  get signupformcontrol() {
    return this.signupform.controls;
  }

  mustMatch(controlName:string, matchingControlName:string){
    console.log("controlName",controlName);
    console.log("matchingControlName", matchingControlName)
    
    return(formGroup:FormGroup) =>{
      console.log(formGroup);
      const control = formGroup.controls[controlName];
      // console.log(control);
      const matchingControl = formGroup.controls[matchingControlName];
      // console.log(matchingControl);
      if(matchingControl.errors && !matchingControl.errors['MustMatch']){
        return
      }
      if(control.value!== matchingControl.value){

        matchingControl.setErrors({mustMatch:true});
      }
      else
      {
        matchingControl.setErrors(null);
      }
    }
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
          swal.fire('Signup Successfully')
      },
      (error: any) => {
        console.log(error);
        swal.fire("Please fill the INFO");
      },
      // checkPasswords(password: string, cpassword: string) {
      //   this.isConfirmPasswordDirty = true;
      //   if (password == cpassword) {
      //     this.passwordsMatching = true;
      //     this.confirmPasswordClass = 'form-control is-valid';
      //   } else {
      //     this.passwordsMatching = false;
      //     this.confirmPasswordClass = 'form-control is-invalid';
      //   }
    );
  }

  

}
