import axios from "axios";
import { URL } from "../utils/constants";
import {
  GET_CLIENTS,
  CLIENTS_LOADING,
  UPDATE_CLIENT,
  UPDATE_CLIENT_FAIL,
  ADD_CLIENT,
  ADD_CLIENT_FAIL,
  FILTER_CLIENTS
} from "./types";
import { returnErrors } from "./errorActions";

export const getClients = () => async (dispatch) => {
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

export const getFilteredClients = (currentFilters) => (dispatch, getState) => {
  try {
    dispatch(setClientsLoading());

    const filtered = filterByProperty(currentFilters, getState);
    console.log("filtered from clientsAction ", filtered);

    dispatch({
      type: FILTER_CLIENTS,
      payload: filtered
    });
  } catch (err) {
    console.log("err from clients backend: ", err);
  }
};

export const updateClient = (clientId, updatedClient) => async (dispatch) => {
  axios
    .put(`${URL}/${clientId}`, updatedClient)
    .then((res) => {
      console.log("res from update client (put) backend in actions", res);
      dispatch({
        type: UPDATE_CLIENT,
        payload: res
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPDATE_CLIENT_FAIL"
        )
      );
      dispatch({ type: UPDATE_CLIENT_FAIL });
      console.log("err from update client (put) backend ", err);
    });
};

export const addClient = (newClient) => async (dispatch) => {
  axios
    .post(`${URL}/add`, newClient)
    .then((res) => {
      console.log("res from add new client (post) backend ", res);
      dispatch({
        type: ADD_CLIENT,
        payload: res
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "ADD_CLIENT_FAIL")
      );
      dispatch({ type: ADD_CLIENT_FAIL });
      console.log("err from add new client (post) backend ", err);
    });
};

export const setClientsLoading = () => {
  return {
    type: CLIENTS_LOADING
  };
};

export const filterByProperty = (currentFilters, getState) => {
  let filteredClients = [...getState().clients.filteredClients];

  for (let key in currentFilters) {
    if (currentFilters[key] !== "") {
      filteredClients = filteredClients.filter(
        (client) => client[key] === currentFilters[key]
      );
    }
  }
  return filteredClients;
};
