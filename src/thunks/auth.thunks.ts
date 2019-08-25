import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { loginUser, restoreUser } from '../actions/auth.actions';
import { getUser, postAccessToken } from '../api/axios';
import { AppState } from '../store/store';
import { IUser } from '../types/auth.types'

export const thunkLoginUser = (
  accessToken: string
): ThunkAction<void, AppState, null, Action<IUser>> => async dispatch => {
  const response = await postAccessToken(accessToken);
  const authToken = response.headers['x-auth-token'];
  const user: IUser = response.data;

  dispatch(loginUser(authToken, user));
};

export const thunkRestoreUser = (
  authToken: string,
  userId: string
): ThunkAction<void, AppState, null, Action<IUser>> => async dispatch => {
  const response = await getUser(authToken, userId);
  const user: IUser = response.data;

  dispatch(restoreUser(user));
};