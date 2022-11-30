import { UserDetail, UserDetailDTO } from "src/app/Models/user-details.model"

export interface UserDetails {
    details: UserDetail[]
}
export interface  UserDetailsDTO {
    details: UserDetailDTO[]
}
export interface UserDetailState {
    details: any,
}