import { combineReducers } from "redux";
import scheduleReducer from "./schedule";
import loadersReducer from "./loaders";
import systemReducer from "./system";

export default combineReducers({
  scheduleReducer,
  loadersReducer,
  systemReducer,
});
