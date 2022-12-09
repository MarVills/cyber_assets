import { Injectable } from '@angular/core';
import { AccountDetails } from 'src/app/Models/manage-account.model';
import { UserDetail, UserIdDTO } from 'src/app/Models/user-details.model';

@Injectable({
  providedIn: 'root',
})
export class User {
  signedInUserDetails!: AccountDetails;
  signedInUserId!: UserIdDTO;
}
