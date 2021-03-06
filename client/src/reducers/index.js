import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import clientsReducer from "./clientsReducer";

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  clients: clientsReducer
});
