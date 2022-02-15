import { SET_LOADING_REGISTER, SET_LOADING_LOGIN } from "../../const";

export const setLoadingRegister = loading => dispatch => {
  return dispatch({
    type: SET_LOADING_REGISTER,
    payload: loading,
  });
};

export const setLoadingLogin = loading => dispatch => {
  return dispatch({
    type: SET_LOADING_LOGIN,
    payload: loading,
  });
};
