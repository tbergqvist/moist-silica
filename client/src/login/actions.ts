import { route } from "preact-router";
import { fetcher } from "../fetcher";
import { GameApi } from "../../../shared/api";

export const LOGIN_START = "LOGIN_START";
function loginStart() {
  return {
    type: LOGIN_START
  }
}

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
function loginSuccess() {
  return {
    type: LOGIN_SUCCESS
  }
}

export const LOGIN_FAILED = "LOGIN_FAILED";
function loginFailed(error) {
  return {
    type: LOGIN_FAILED,
    error
  }
}

export function login(username: string, password: string) {
  return async (dispatch)=> {
    dispatch(loginStart());
    let body: GameApi.LoginBody = {username, password};
    try {
      let response = await fetcher.post("http://localhost:3000/login", body);
      console.log(response);
      if (response.status === 200 || response.status === 204) {
        dispatch(loginSuccess());
        route("/");
      } else {
        dispatch(loginFailed(response.statusText));
      }
    } catch (e) {
      dispatch(loginFailed(500));
    }
  }
}