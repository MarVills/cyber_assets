import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountDetails, ACCOUNT_DETAILS_DATA } from 'src/app/Models/manage-account.model';
import { AccountDialogComponent } from './components/account-dialog/account-dialog.component';
import { ManageAccountService } from 'src/app/store/services/manage-account.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  searchText: any;
  accounts: AccountDetails[] = [];

  constructor(
    public dialog: MatDialog,
    public manageAccount: ManageAccountService) { }

  ngOnInit(): void {
    this.manageAccount.fetchAccounts();
    setTimeout(() => {
      this.accounts = ACCOUNT_DETAILS_DATA;
    }, 1000);
  }

  openDialog(action: string, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(AccountDialogComponent, {
        width: '500px',
        data: obj
    });
  
    dialogRef.afterClosed().subscribe(result => {
    });
    }
}
