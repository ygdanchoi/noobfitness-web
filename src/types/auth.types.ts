export interface IUser {
  _id: string;
  avatar: string;
  googleId: number;
  routines: IUserRoutine[];
  username: string;
}

export interface IUserRoutine {
  _id: string;
  name: string;
}

export interface IAuthState {
  authToken: string;
  isAuthenticated: boolean;
  user: IUser;
  userId: string;
}

export interface ILoginUserAction {
  authToken: string;
  type: typeof LOGIN_USER;
  user: IUser;
}

export interface IRestoreUserAction {
  type: typeof RESTORE_USER;
  user: IUser;
}

export interface ILogoutUserAction {
  type: typeof LOGOUT_USER;
}

export const LOGIN_USER = 'LOGIN_USER';
export const RESTORE_USER = 'RESTORE_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const NO_USER: IUser = {
  _id: '',
  avatar: '',
  googleId: 0,
  routines: [],
  username: 'Logged Out'
}

export type AuthAction = ILoginUserAction | IRestoreUserAction | ILogoutUserAction;