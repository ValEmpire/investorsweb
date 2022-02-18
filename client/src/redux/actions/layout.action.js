import { SET_WINDOW_WIDTH } from "../../const";

export const setWindowWidth = width => dispatch => {
  return dispatch({
    type: SET_WINDOW_WIDTH,
    payload: width,
  });
};
