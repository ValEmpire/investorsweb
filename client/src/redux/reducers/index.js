import { combineReducers } from "redux";

// reducers
import { user } from "./user.reducer";
import { project } from "./project.reducer";
import { stripe } from "./stripe.reducer";

export default combineReducers({
  user,
  project,
  stripe,
});
