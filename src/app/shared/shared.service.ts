import { Injectable } from '@angular/core';
import { SnackbarComponent } from './components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private snackbarComponent: SnackbarComponent
  ) { }

  openSnackBar(message: string, buttonName: string) {
   this.snackbarComponent.openSnackBar(message, buttonName)
  }
}
