export interface UserDetail{
    id?: string
    firstName: string,
    lastName: string,
    middleName: string,
    userRole: string,
    emailAddress: string,
    contactNumber: string,
    description: string,
    uid: string
}

export interface UserDetailDTO{
    id: string
    firstName: string,
    lastName: string,
    middleName: string,
    userRole: string,
    emailAddress: string,
    contactNumber: string,
    description: string,
    uid: string
}

export interface UserIdDTO{
    userID: string
}

export interface UserId{
    userID: string
}

export interface userSigninResponseDTO{
    uid:string
}