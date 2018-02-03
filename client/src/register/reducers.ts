import { combineReducers } from "redux";
import { REGISTER_START, REGISTER_FAILED, REGISTER_SUCCESS } from "./actions";
import { RegisterState } from "../state";

function registerStart(state: RegisterState, action): RegisterState {
  return {
    ...state,
    loading: true,
    error: undefined
  };
}

function registerSuccess(state: RegisterState, action): RegisterState {
  return {
    ...state,
    loading: false
  };
}

function registerFailed(state: RegisterState, action): RegisterState {
  return {
    ...state,
    loading: false,
    error: action.error
  };
}

export function registerReducer(state: RegisterState = {loading: false, error: undefined }, action) {
  switch(action.type) {
    case REGISTER_START:
      return registerStart(state, action);
    case REGISTER_SUCCESS:
      return registerSuccess(state, action);
    case REGISTER_FAILED:
      return registerFailed(state, action);
    default:
      return state;
  }
}