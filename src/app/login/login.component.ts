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
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
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
          console.log(response[0], 'this is what');
          // this.msg = 'User login successfully!';
          this.submitted = true;
          // swal.fire('Logged in SUCCESSFULLYYYYY');
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
