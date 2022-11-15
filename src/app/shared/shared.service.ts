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
  
}
