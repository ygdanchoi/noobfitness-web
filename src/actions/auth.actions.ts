import { ILoginAction, ILogoutAction, IUser, LOGIN, LOGOUT } from '../types/auth.types';

export function login(user: IUser): any {
  const action: ILoginAction = {
    type: LOGIN,
    user
  };
  return action;
}

export function logout(): any {
  const action: ILogoutAction = {
    type: LOGOUT
  };
  return action;
}