import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/store/services/auth/auth.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { switchMap } from 'rxjs/operators';

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
    private formBuilder: FormBuilder
  ) {
    this.loginForm();
  }

  ngOnInit() {}

  loginForm() {
    this._loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      rememberMe: new FormControl(''),
    });
  }

  async onLogin() {
    const value = this._loginForm.value;
    if (this._loginForm.valid) {
      this.authService.signIn(value.email, value.password);
    }
  }
}
