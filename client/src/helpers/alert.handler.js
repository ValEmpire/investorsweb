import { SET_ALERT } from "../const";

export const handleError = (err, dispatch) => {
  if (!err.response) {
    return dispatch({
      type: SET_ALERT,
      payload: {
        open: true,
        message: "Service unavailable.",
        type: "error",
      },
    });
  }

  if (err.response.status === 400) {
    return dispatch({
      type: SET_ALERT,
      payload: {
        open: true,
        message: err.response.data.error,
        type: "error",
      },
    });
  } else {
    return dispatch({
      type: SET_ALERT,
      payload: {
        open: true,
        message: "Service unavailable.",
        type: "error",
      },
    });
  }
};

export const handleSuccess = (message, dispatch) => {
  return dispatch({
    type: SET_ALERT,
    payload: {
      open: true,
      message,
      type: "success",
    },
  });
};
