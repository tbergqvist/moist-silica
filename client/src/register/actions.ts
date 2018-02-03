import { route } from "preact-router";
import { fetcher } from "../fetcher";
import { API } from "../../../shared/api";

export const REGISTER_START = "REGISTER_START";
function registerStart() {
  return {
    type: REGISTER_START
  }
}

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
function registerSuccess() {
  return {
    type: REGISTER_SUCCESS
  }
}

export const REGISTER_FAILED = "REGISTER_FAILED";
function registerFailed(error) {
  return {
    type: REGISTER_FAILED,
    error
  }
}

export function register(username: string, password: string) {
  return async (dispatch)=> {
    dispatch(registerStart());
    let body: API.LoginBody = { username, password };
    try {
      let response = await fetcher.post("http://localhost:3000/register", body);
      console.log(response);
      if (response.status === 200 || response.status === 204) {
        dispatch(registerSuccess());
        route("home");
      } else {
        dispatch(registerFailed(response.statusText));
      }
    } catch (e) {
      console.log("FLOPP", e);
      dispatch(registerFailed(500));
    }
  }
}