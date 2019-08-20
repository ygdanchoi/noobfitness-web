import { IReceiveCurrentUserAction, IUser, RECEIVE_CURRENT_USER } from '../types/users.types';

export function receiveCurrentUser(user: IUser, authToken: string): any {
  const action: IReceiveCurrentUserAction = {
    currentUser: {...user, authToken},
    type: RECEIVE_CURRENT_USER
  };
  return action;
}