import { AccountCredentials } from '../../Models/manage-account.model';

export interface AuthState {
  signedIn: boolean;
  uid: string;
}
