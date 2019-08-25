import { Reducer } from 'redux';
import {
  AuthAction, IAuthState, ILoginUserAction,
  LOGIN_USER, LOGOUT_USER, NO_USER, RESTORE_USER, 
} from '../types/auth.types';

const AUTH_TOKEN_KEY = 'AUTH_TOKEN_KEY';
const USER_ID_KEY = 'USER_ID_KEY';

function getNonNullLocalStorageItem(key: string) {
  const item = localStorage.getItem(key);

  return (item !== null)
    ? item
    : '';
}

const INITIAL: IAuthState = {
  authToken: getNonNullLocalStorageItem(AUTH_TOKEN_KEY),
  isAuthenticated: getNonNullLocalStorageItem(AUTH_TOKEN_KEY).length > 0,
  user: NO_USER,
  userId: getNonNullLocalStorageItem(USER_ID_KEY)
}

const AuthReducer: Reducer<IAuthState, AuthAction> = (
  state: IAuthState = INITIAL,
  action: AuthAction
): IAuthState => {  
  switch (action.type) {
    case LOGIN_USER:
      loginUserSideEffects(action);
      return {
        authToken: action.authToken,
        isAuthenticated: true,
        user: action.user,
        userId: action.user._id
      };
    case RESTORE_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.user
      }
    case LOGOUT_USER:
      logoutUserSideEffects();
      return {
        authToken: '',
        isAuthenticated: false,
        user: NO_USER,
        userId: ''
      };
    default:
      return state;
  }
}

function loginUserSideEffects(action: ILoginUserAction) {
  localStorage.setItem(AUTH_TOKEN_KEY, action.authToken);
  localStorage.setItem(USER_ID_KEY, action.user._id);
}

function logoutUserSideEffects() {
  localStorage.clear();
}

export default AuthReducer;