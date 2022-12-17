import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  AccountDetails,
  ACCOUNT_DETAILS_DATA,
} from 'src/app/Models/manage-account.model';
import { AccountDialogComponent } from './components/account-dialog/account-dialog.component';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent implements OnInit {
  searchText: any;
  accounts: AccountDetails[] = [];

  constructor(
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {}

  openDialog(action: string, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(AccountDialogComponent, {
      width: '500px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
