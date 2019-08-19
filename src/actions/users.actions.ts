import { RECEIVE_CURRENT_USER } from '../types/users.types';

export function receiveCurrentUser(user: any) {
  return {
    currentUser: user,
    type: RECEIVE_CURRENT_USER
  };
}