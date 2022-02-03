import { combineReducers } from "redux";

// reducers
import { user } from "./user.reducer";
import { project } from "./project.reducer";

export default combineReducers({
  user,
  project,
});
