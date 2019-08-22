import {
  ILoginUserAction, ILogoutUserAction, IRestoreUserAction, IUser,
  LOGIN_USER, LOGOUT_USER, RESTORE_USER
} from '../types/auth.types';

export function loginUser(authToken: string, user: IUser): any {
  const action: ILoginUserAction = {
    authToken,
    type: LOGIN_USER,
    user
  };
  return action;
}

export function restoreUser(user: IUser): any {
  const action: IRestoreUserAction = {
    type: RESTORE_USER,
    user
  }
  return action;
}

export function logoutUser(): any {
  const action: ILogoutUserAction = {
    type: LOGOUT_USER
  };
  return action;
}