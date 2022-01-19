import axios from "axios";
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";
import { returnErrors } from "./errorActions";

// check token & load user
export const loadUser = () => (dispatch, getState) => {
  // user loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/auth/user", tokenConfig(getState))
    .then((res) => {
      console.log(res.data);

      dispatch({ type: USER_LOADED, payload: res.data });
    })

    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "AUTH_ERROR")
      );
      dispatch({ type: AUTH_ERROR });
    });
};

// Register user
export const registerUser =
  ({ name, email, password }) =>
  (dispatch) => {
    // headers
    const config = {
      headers: { "Content-Type": "application/json" }
    };

    // req body
    const body = JSON.stringify({ name, email, password });

    axios
      .post("/auth/register", body, config)
      .then((res) => {
        dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
        );
        dispatch({ type: REGISTER_FAIL });
      });
  };

// login user
export const login =
  ({ email, password }) =>
  (dispatch) => {
    // headers
    const config = {
      headers: { "Content-Type": "application/json" }
    };

    // req body
    const body = JSON.stringify({ email, password });
    console.log(body, "body");

    axios
      .post("/auth/login", body, config)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        console.log("err of login ", err.response);
        dispatch(
          returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
        );
        dispatch({ type: LOGIN_FAIL });
      });
  };

// logout user
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

// setup config/headers and token
export const tokenConfig = (getState) => {
  // get token from localStorage
  const token = getState().auth.token;

  // headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // if token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};
