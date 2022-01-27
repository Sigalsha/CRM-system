import {
  GET_CLIENTS,
  CLIENTS_LOADING,
  UPDATE_CLIENT,
  ADD_CLIENT,
  FILTER_CLIENTS,
  ADD_CLIENT_FAIL,
  UPDATE_CLIENT_FAIL
} from "../actions/types";

const initialState = {
  clients: [],
  filteredClients: [],
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CLIENTS:
      return {
        ...state,
        clients: action.payload,
        filteredClients: action.payload,
        loading: false
      };
    case FILTER_CLIENTS:
      return {
        ...state,
        clients: action.payload,
        loading: false
      };
    case UPDATE_CLIENT:
      return {
        ...state,
        loading: false
      };
    case ADD_CLIENT:
      return {
        ...state,
        clients: [action.payload, ...state.clients],
        loading: false
      };
    case CLIENTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case UPDATE_CLIENT_FAIL:
    case ADD_CLIENT_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
