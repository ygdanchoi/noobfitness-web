import { ILoginAction, ILogoutAction, IUser, LOGIN, LOGOUT } from '../types/auth.types';

export function login(user: IUser, authToken: string): any {
  const action: ILoginAction = {
    type: LOGIN,
    user: {...user, authToken}
  };
  return action;
}

export function logout(): any {
  const action: ILogoutAction = {
    type: LOGOUT
  };
  return action;
}