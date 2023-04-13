import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
 import swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  onloginclick() {
    this.router.navigate(['/', 'signup']);
  }

  loginform!: FormGroup;

  submitted = false;
  // private router:Router

  constructor(
    private apiService: ApiServiceService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginform = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get loginformcontrols() {
    return this.loginform.controls;
  }

  submitlogin() {
    const data = this.loginform.value;
    console.log('user data for login', data);
    this.apiService.login(data).subscribe(
      (response: any) => {
        console.log(response[0]);
        if (response[0].email == this.loginform.value.email) {
          console.log(response[0], 'this is what it s');
          // this.msg = 'User login successfully!';
          this.submitted = true;
<<<<<<< HEAD
          // swal.fire('Logged in SUCCESSFULLYYYYY');
=======
          // swal.fire('Logged in Sucessfully');
>>>>>>> ecd96c26077c8db5a7ba71c6082622a1f549ac73
          //path to dashboard
          this.router.navigate(['/', 'dashboard']);
          localStorage.setItem('userId', response[0].id);
          // alert(localStorage.getItem('userId'));
          // localStorage.removeItem('userId');
        }
      },
      (error) => {
        console.log(error);
        swal.fire('Please enter correct username and password');
      }
    );
  }
}
