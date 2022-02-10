import { combineReducers } from "redux";

// reducers
import { user } from "./user.reducer";
import { project } from "./project.reducer";
import { investment } from "./investment.reducer";

export default combineReducers({
  user,
  project,
  investment,
});
