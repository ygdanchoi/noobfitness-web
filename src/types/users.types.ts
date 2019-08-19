export interface IUsersState {
  currentUser: any
}

export interface IReceiveCurrentUserAction {
  type: typeof RECEIVE_CURRENT_USER,
  currentUser: any,
  error: any
}

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';

export type UsersAction = IReceiveCurrentUserAction;