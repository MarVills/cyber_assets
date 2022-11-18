import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/store/services/authentication/auth.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
 
  msg = '';
  _loginForm!: FormGroup;

  constructor(
    private routes: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,) {
      this.loginForm();
    }

  ngOnInit() {}

  loginForm(){
    this._loginForm = this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
      rememberMe: new FormControl(""),
     });
  }

  async onLogin(){
    var value = this._loginForm.value;
    if((value.email != "") 
    && (value.password != "") 
    && (await this.authService.signIn(value.email, value.password))
    ){
      console.log("logedin")
      this.routes.navigate(['/dashboard']);
    } else {  
      console.log("not signed in")
      this.msg = 'Invalid Username or Password';
    }
  }
}
