export interface IUser {
  _id: string,
  googleId: number,
  username: string,
  avatar: string
  routines: string,
  authToken: string
}

export interface IUsersState {
  currentUser: IUser | null
}

export interface IReceiveCurrentUserAction {
  type: typeof RECEIVE_CURRENT_USER,
  currentUser: IUser
}

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';

export type UsersAction = IReceiveCurrentUserAction;