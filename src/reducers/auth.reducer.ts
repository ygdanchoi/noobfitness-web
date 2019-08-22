import { Reducer } from 'redux';
import {
  AuthAction, IAuthState, ILoginUserAction, ILogoutUserAction,
  LOGIN_USER, LOGOUT_USER, RESTORE_USER
} from '../types/auth.types';

const AUTH_TOKEN_KEY = 'AUTH_TOKEN_KEY';
const USER_ID_KEY = 'USER_ID_KEY';

const INITIAL: IAuthState = {
  authToken: localStorage.getItem(AUTH_TOKEN_KEY),
  user: null,
  userId: localStorage.getItem(USER_ID_KEY)
}

const AuthReducer: Reducer<IAuthState, AuthAction> = (
  state: IAuthState = INITIAL,
  action: AuthAction
): IAuthState => {  
  switch (action.type) {
    case LOGIN_USER:
      loginUserSideEffects(action);
      return { authToken: action.authToken, user: action.user, userId: action.user._id };
    case RESTORE_USER:
      return { ...state, user: action.user }
    case LOGOUT_USER:
      logoutUserSideEffects(action);
      return { authToken: null, user: null, userId: null};
    default:
      return state;
  }
}

function loginUserSideEffects(action: ILoginUserAction) {
  localStorage.setItem(AUTH_TOKEN_KEY, action.authToken);
  localStorage.setItem(USER_ID_KEY, action.user._id);
}

function logoutUserSideEffects(action: ILogoutUserAction) {
  localStorage.clear();
}

export default AuthReducer;