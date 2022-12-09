import { UserDetail, UserDetailDTO } from 'src/app/Models/user-details.model';

export interface UserDetails {
  users: UserDetail[];
}
export interface UserDetailsDTO {
  users: UserDetailDTO[];
}
export interface UserDetailState {
  users: any;
}
