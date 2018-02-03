import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { loginReducer } from './login/reducers';
import { registerReducer } from './register/reducers';

export const store = createStore(combineReducers({
    login: loginReducer,
    register: registerReducer
}), {}, applyMiddleware(
  thunkMiddleware // lets us dispatch() functions
));