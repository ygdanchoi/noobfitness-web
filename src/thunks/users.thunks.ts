import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { receiveCurrentUser } from "../actions/users.actions";
import { AppState } from "../store/store";

export const thunkReceiveCurrentUser = (
  user: any
): ThunkAction<void, AppState, null, Action<any>> => async dispatch => {
  // const asyncResp = await exampleAPI();
  dispatch(
    receiveCurrentUser(user)
  );
};

// function exampleAPI() {
//   return Promise.resolve("Async Chat Bot");
// }
