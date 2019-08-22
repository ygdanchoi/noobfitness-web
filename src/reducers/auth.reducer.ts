import { Reducer } from 'redux';
import { AuthAction, IAuthState, LOGIN_USER, LOGOUT_USER, RESTORE_USER } from '../types/auth.types';

const AUTH_TOKEN_KEY = 'AUTH_TOKEN_KEY';
const USER_ID_KEY = 'USER_ID_KEY';

const INITIAL: IAuthState = {
  authToken: localStorage.getItem(AUTH_TOKEN_KEY),
  user: null,
  userId: localStorage.getItem(USER_ID_KEY)
}

const LOGGED_OUT: IAuthState = {
  authToken: null,
  user: null,
  userId: null
}

const AuthReducer: Reducer<IAuthState, AuthAction> = (
  state: IAuthState = INITIAL,
  action: AuthAction
): IAuthState => {
  switch (action.type) {
    case LOGIN_USER:
      localStorage.setItem(AUTH_TOKEN_KEY, action.authToken);
      localStorage.setItem(USER_ID_KEY, action.user._id);

      return { authToken: action.authToken, user: action.user, userId: action.user._id };
    case RESTORE_USER:
      return { ...state, user: action.user }
    case LOGOUT_USER:
      localStorage.clear();

      return LOGGED_OUT;
    default:
      return state;
  }
}

export default AuthReducer;