import { Reducer } from 'redux';
import { AuthAction, IAuthState, LOGIN, LOGOUT } from '../types/auth.types';

const LOGGED_OUT: IAuthState = {
  user: null
}

const AuthReducer: Reducer<IAuthState, AuthAction> = (
  state: IAuthState = LOGGED_OUT,
  action: AuthAction
): IAuthState => {
  switch (action.type) {
    case LOGIN:
      return {user: action.user};
    case LOGOUT:
      return LOGGED_OUT;
    default:
      return state;
  }
}

export default AuthReducer;