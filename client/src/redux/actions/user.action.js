import { REGISTER_USER, LOGIN_USER, LOGOUT_USER } from "../../const";
import axios from "axios";
import Cookies from "js-cookie";

export const registerUser =
  ({ firstName, lastName, email, password }) =>
  async (dispatch) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER}/api/user/register`,
        {
          firstName,
          lastName,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      Cookies.set("isAuthenticated", true);

      window.location.replace("/");

      return dispatch({
        type: REGISTER_USER,
      });
    } catch (err) {
      return err;
    }
  };

export const loginUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER}/api/user/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      Cookies.set("isAuthenticated", true);

      window.location.replace("/");

      return dispatch({
        type: LOGIN_USER,
      });
    } catch (err) {
      return err;
    }
  };

// This function will be use in App.js
// To initialized user in store
export const getUser = async () => {
  try {
    const isAuthenticated = Cookies.get("isAuthenticated");

    if (!isAuthenticated) return;

    const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/user`, {
      withCredentials: true,
    });

    return res.data.user;
  } catch (err) {
    // if error happens remove cookie
    Cookies.remove("isAuthenticated");

    return new Error("Invalid token");
  }
};

export const logoutUser = () => async (dispatch) => {
  await axios.post(`${process.env.REACT_APP_SERVER}/api/user/logout`);

  Cookies.remove("isAuthenticated");
  Cookies.remove("token");

  window.location.replace("/");

  return dispatch({
    type: LOGOUT_USER,
  });
};
