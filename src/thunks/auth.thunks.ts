import axios from 'axios';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { loginUser, restoreUser } from '../actions/auth.actions';
import { AppState } from '../store/store';
import { IUser } from '../types/auth.types'

export const thunkLoginUser = (
  accessToken: string
): ThunkAction<void, AppState, null, Action<IUser>> => async dispatch => {
  const response = await axios({
    data: { access_token: accessToken },
    method: 'POST',
    url: 'http://localhost:5000/api/auth/google'
  })
  
  const authToken = response.headers['x-auth-token'];
  const user: IUser = response.data;

  dispatch(
    loginUser(authToken, user)
  );
};

export const thunkRestoreUser = (
  authToken: string,
  userId: string
): ThunkAction<void, AppState, null, Action<IUser>> => async dispatch => {
  const response = await axios({
    headers: { 'x-auth-token': authToken },
    method: 'GET',
    url: `http://localhost:5000/api/users/${userId}`
  });

  const user: IUser = response.data;

  dispatch(
    restoreUser(user)
  );
};