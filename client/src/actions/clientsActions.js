import axios from "axios";
import {
  GET_CLIENTS,
  CLIENTS_LOADING,
  UPDATE_CLIENT,
  ADD_CLIENT
} from "./types";
import { returnErrors } from "./errorActions";
import { URL } from "../utils/constants";

export const getClients = () => (dispatch) => {
  dispatch(setClientsLoading());
  axios
    .get(URL)
    .then((res) => {
      console.log("res from clients backend in actions: ", res.data.data);
      const { data } = res.data;
      return dispatch({
        type: GET_CLIENTS,
        payload: data
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      console.log("err from clients backend: ", err);
    });
};

export const updateClient = (clientId, updatedClient) => (dispatch) => {
  axios
    .put(`${URL}${clientId}`, updatedClient)
    .then((res) => {
      console.log("res from update client (put) backend in actions", res);
      dispatch({
        type: UPDATE_CLIENT,
        payload: res
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      console.log("err from update client (put) backend ", err);
    });
};

export const addClient = (newClient) => (dispatch) => {
  axios
    .post(`${URL}add`, newClient)
    .then((res) => {
      console.log("res from add new client (post) backend ", res);
      dispatch({
        type: ADD_CLIENT,
        payload: res
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      console.log("err from add new client (post) backend ", err);
    });
};

export const setClientsLoading = () => {
  return {
    type: CLIENTS_LOADING
  };
};
