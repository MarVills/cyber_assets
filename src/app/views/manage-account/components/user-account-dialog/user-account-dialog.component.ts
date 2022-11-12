// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-user-account-dialog',
//   templateUrl: './user-account-dialog.component.html',
//   styleUrls: ['./user-account-dialog.component.scss']
// })
// export class UserAccountDialogComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactData } from '../../manage-account.component';


@Component({
  selector: 'app-user-account-dialog',
  templateUrl: './user-account-dialog.component.html',
  styleUrls: ['./user-account-dialog.component.scss']
})
// tslint:disable-next-line: component-class-suffix
export class UserAccountDialogComponent {

  action: string;
  local_data: any;

  constructor(
      public dialogRef: MatDialogRef<UserAccountDialogComponent>,
      // @Optional() is used to prevent error if no data is passed
      @Optional() @Inject(MAT_DIALOG_DATA) public data: ContactData) {
      // console.log(data);
      this.local_data = { ...data };
      this.action = this.local_data.action;
  }

  doAction() {
      this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog() {
      this.dialogRef.close({ event: 'Cancel' });
  }

}

