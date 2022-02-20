import { combineReducers } from "redux";

// reducers
import { user } from "./user.reducer";
import { project } from "./project.reducer";
import { investment } from "./investment.reducer";
import { alert } from "./alert.reducer";
import { stripe } from "./stripe.reducer";
import { loading } from "./loading.reducer";
import { comment } from "./comment.reducer";
import { layout } from "./layout.reducer";

export default combineReducers({
  user,
  project,
  investment,
  stripe,
  alert,
  loading,
  comment,
  layout,
});
