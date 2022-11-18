export interface AccountDetails {
    id?: string,
    firstName: string;
    lastName: string;
    middleName: string;
    userRole?: string;
    emailAddress: string;
    contactNumber: string;
    description: string;
    uid?: string;
    profileImageID: string
  }

export interface AccountCredentials{
  email: string;
  password: string;
}


export interface AllData{
    firstName: string;
    lastName: string;
    middleName: string;
    userRole: string;
    emailAddress: string;
    contactNumber: string;
    description: string;
    profileimage?: string;
    password: string;
}

export const ACCOUNT_DETAILS_DATA: AccountDetails[] = [
 
];

export interface Contact {
  contactimg: string;
  contactname: string;
  contactpost: string;
  contactadd: string;
  contactno: string;
  contactinstagram: string;
  contactlinkedin: string;
  contactfacebook: string;
}

