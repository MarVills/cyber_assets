import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { SnackbarComponent } from './components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private snackbarComponent: SnackbarComponent
  ) { }

  openSnackBar(message: string, buttonName: string = "Ok") {
   this.snackbarComponent.openSnackBar(message, buttonName)
  }

  randomString(length:number) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }
  
}
