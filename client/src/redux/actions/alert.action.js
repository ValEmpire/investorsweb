import { SET_ALERT } from "../../const";

export const setAlert =
  ({ open, message, type }) =>
  dispatch => {
    dispatch({
      type: SET_ALERT,
      payload: {
        open,
        message,
        type,
      },
    });

    return;
  };
