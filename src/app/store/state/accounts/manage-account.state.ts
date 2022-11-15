export interface AccountDetails {
    firstName: string;
    lastName: string;
    middleName: string;
    userRole: string;
    emailAddress: string;
    contactNumber: string;
    description: string;
    uid: string;
  }

export interface AccountCredentials{
  email: string;
  password: string;
}

// export interface AccountData{
//   accountDetails: AccountDetails,
//   accoutCredentials: AccountCredentials
// }

export interface AllData{
    firstName: string;
    lastName: string;
    middleName: string;
    userRole: string;
    emailAddress: string;
    contactNumber: string;
    description: string;
    password: string;
}
  
