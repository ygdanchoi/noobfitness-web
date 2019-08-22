import { Reducer } from 'redux';
import { AuthAction, IAuthState, LOGIN_USER, LOGOUT_USER, RESTORE_USER } from '../types/auth.types';

const AUTH_TOKEN_KEY = 'AUTH_TOKEN_KEY';
const USER_ID_KEY = 'USER_ID_KEY';

const INITIAL: IAuthState = {
  authToken: sessionStorage.getItem(AUTH_TOKEN_KEY),
  user: null,
  userId: sessionStorage.getItem(USER_ID_KEY)
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
      sessionStorage.setItem(AUTH_TOKEN_KEY, action.authToken);
      sessionStorage.setItem(USER_ID_KEY, action.user._id);

      return { authToken: action.authToken, user: action.user, userId: action.user._id };
    case RESTORE_USER:
      return { ...state, user: action.user }
    case LOGOUT_USER:
      sessionStorage.clear();

      return LOGGED_OUT;
    default:
      return state;
  }
}

export default AuthReducer;