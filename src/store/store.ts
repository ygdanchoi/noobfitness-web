import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import AuthReducer from '../reducers/auth.reducer';

const rootReducer = combineReducers({
  auth: AuthReducer
});

const configureStore = () => (
  createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
  )
);

export type AppState = ReturnType<typeof rootReducer>

export default configureStore;