import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { login, logout } from '../actions/auth.actions';
import { AppState } from '../store/store';
import { IUser } from '../types/auth.types'

export const thunkLogin = (
  user: IUser,
  authToken: string,
): ThunkAction<void, AppState, null, Action<IUser>> => async dispatch => {
  // const asyncResp = await exampleAPI();
  dispatch(
    login(user, authToken)
  );
};

export const thunkLogout = (
): ThunkAction<void, AppState, null, Action<IUser>> => async dispatch => {
  // const asyncResp = await exampleAPI();
  dispatch(
    logout()
  );
};

// function exampleAPI() {
//   return Promise.resolve('Async Chat Bot');
// }
