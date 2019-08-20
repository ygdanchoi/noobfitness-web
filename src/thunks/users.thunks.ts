import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { receiveCurrentUser } from '../actions/users.actions';
import { AppState } from '../store/store';
import { IUser } from '../types/users.types'

export const thunkReceiveCurrentUser = (
  user: IUser,
  authToken: string,
): ThunkAction<void, AppState, null, Action<IUser>> => async dispatch => {
  // const asyncResp = await exampleAPI();
  dispatch(
    receiveCurrentUser(user, authToken)
  );
};

// function exampleAPI() {
//   return Promise.resolve('Async Chat Bot');
// }
