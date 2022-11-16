
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireAuth } from "@angular/fire/auth";
import { SharedService } from 'src/app/shared/shared.service';
import { RegisterService } from 'src/app/store/services/authentication/register.service';
import { AccountDetails } from 'src/app/store/state/accounts/manage-account.state';


@Component({
  selector: 'app-user-account-dialog',
  templateUrl: './user-account-dialog.component.html',
  styleUrls: ['./user-account-dialog.component.scss']
})
export class UserAccountDialogComponent implements OnInit{

  action: string;
  local_data: any;
  _accountDialogForm!: FormGroup;

  constructor(
      public dialogRef: MatDialogRef<UserAccountDialogComponent>,
      @Optional() @Inject(MAT_DIALOG_DATA) public data: AccountDetails,
      private formBuilder: FormBuilder,
      private angularFireAuth: AngularFireAuth,
      private sharedService: SharedService,
      private registerService: RegisterService) {
      this.local_data = { ...data };
      this.action = this.local_data.action;
  }
  ngOnInit(): void {
    this.accountDialogForm();
  }

  accountDialogForm(){
    this._accountDialogForm = this.formBuilder.group({
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      middleName: new FormControl("", Validators.required),
      userRole: new FormControl("", Validators.required),
      emailAddress: new FormControl("", [Validators.required, Validators.email]),
      contactNumber: new FormControl("", Validators.required),
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
      description: new FormControl("", Validators.required),
     });
  }

  doAction() {
      this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  createAccount(formDirective : FormGroupDirective){
    var value = this._accountDialogForm.value;
    this.registerService.signUp(value)
    this._accountDialogForm.reset();
    formDirective.resetForm();
  }

  closeDialog() {
      this.dialogRef.close({ event: 'Cancel' });
  }
}

