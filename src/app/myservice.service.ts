import { Injectable } from '@angular/core';
import { LoginService } from './store/services/authentication/login.service';

@Injectable()
export class MyserviceService {

  constructor(private loginService: LoginService) { }

  async checkusernameandpassword(uname: string, pwd: string) {
    // if (uname === 'admin' && pwd === 'admin123') {
    //   localStorage.setItem('username', 'admin');
    //   return true;
    // } else {
    //   return false;
    // }
    if(await this.loginService.signIn(uname, pwd)){
      console.log(this.loginService.signIn(uname, pwd))
      localStorage.setItem('username', 'admin');
      return true;
    } else {  
      return false
    }
  }
}
