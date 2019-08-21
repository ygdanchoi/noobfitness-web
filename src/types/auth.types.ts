export interface IUser {
  _id: string,
  googleId: number,
  username: string,
  avatar: string
  routines: IUserRoutine[],
  authToken: string
}

export interface IUserRoutine {
  _id: string;
  name: string;
}

export interface IAuthState {
  user: IUser | null
}

export interface ILoginAction {
  type: typeof LOGIN,
  user: IUser
}

export interface ILogoutAction {
  type: typeof LOGOUT,
}

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export type AuthAction = ILoginAction | ILogoutAction;