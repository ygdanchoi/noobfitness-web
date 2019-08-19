import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import UsersReducer from '../reducers/users.reducer';

const rootReducer = combineReducers({
  users: UsersReducer
});

const configureStore = () => (
  createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
  )
);

export type AppState = ReturnType<typeof rootReducer>

export default configureStore;