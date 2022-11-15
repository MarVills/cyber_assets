import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MyserviceService } from '../../myservice.service';
import { LoginService } from 'src/app/store/services/authentication/login.service';

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
  providers: [MyserviceService]
})
export class LoginComponent implements OnInit {
  msg = '';
  constructor(
    private service: MyserviceService, 
    private routes: Router,
    private loginService: LoginService) { }

  async check(uname: string, p: string) {
    const output = await this.service.checkusernameandpassword(uname, p);
    if (output == true) {
      this.routes.navigate(['/dashboard']);
    } else {  
      this.msg = 'Invalid Username or Password';
    }
    
  }

  ngOnInit() {}
}
