import { Reducer } from 'redux';
import {
  IUsersState,
  RECEIVE_CURRENT_USER,
  UsersAction
} from '../types/users.types';

const INITIAL: IUsersState = {
  currentUser: null
}

const UsersReducer: Reducer<IUsersState, UsersAction> = (state: IUsersState = INITIAL, action: UsersAction): IUsersState => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {...state, currentUser: action.currentUser};
    default:
      return state;
  }
}

export default UsersReducer;