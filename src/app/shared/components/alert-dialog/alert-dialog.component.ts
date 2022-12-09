import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomDialogConfig } from './alert-dialog-config.interface';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss'],
})
export class AlertDialogComponent implements OnInit {
  sharedService!: any;
  buttonName: string = 'ok';

  constructor(@Inject(MAT_DIALOG_DATA) public alertData: CustomDialogConfig) {}

  ngOnInit(): void {}

  getValOrDefaultVal(val: any, defaultVal: any): any {
    return val ? val : defaultVal;
  }
}
