export interface IUser {
  _id: string;
  googleId: number;
  username: string;
  avatar: string;
  routines: IUserRoutine[];
}

export interface IUserRoutine {
  _id: string;
  name: string;
}

export interface IAuthState {
  authToken: string | null;
  user: IUser | null;
  userId: string | null;
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

export type AuthAction = ILoginUserAction | IRestoreUserAction | ILogoutUserAction;