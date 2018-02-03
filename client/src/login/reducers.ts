import { combineReducers } from "redux";
import { LOGIN_START, LOGIN_FAILED, LOGIN_SUCCESS } from "./actions";
import { LoginState } from "../state";

function loginStart(state: LoginState, action): LoginState {
  return {
    ...state,
    loading: true,
    error: undefined
  };
}

function loginSuccess(state: LoginState, action): LoginState {
  return {
    ...state,
    loading: false
  };
}

function loginFailed(state: LoginState, action) {
  return {
    ...state,
    loading: false,
    error: action.error
  };
}

export function loginReducer(state: LoginState = {loading: false, error: undefined }, action) {
  switch(action.type) {
    case LOGIN_START:
      return loginStart(state, action);
    case LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case LOGIN_FAILED:
      return loginFailed(state, action);
    default:
      return state;
  }
}