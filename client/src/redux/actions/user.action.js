import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  UPDATE_USER_DETAIL,
  UPDATE_USER_SECURITY,
} from "../../const";
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

    return {
      ...res.data.user,
      userDetail: res.data.user.userDetail || {},
    };
  } catch (err) {
    // if error happens remove cookie
    Cookies.remove("isAuthenticated");

    return new Error("Invalid token");
  }
};

export const logoutUser = () => async (dispatch) => {
  await axios.post(
    `${process.env.REACT_APP_SERVER}/api/user/logout`,
    {},
    {
      withCredentials: true,
    }
  );

  Cookies.remove("isAuthenticated");

  window.location.replace("/");

  return dispatch({
    type: LOGOUT_USER,
  });
};

export const updateUserDetail = (userDetail) => async (dispatch) => {
  try {
    const { city, province, phoneNumber, headline } = userDetail;

    const res = await axios.put(
      `${process.env.REACT_APP_SERVER}/api/userdetail`,
      { city, province, phoneNumber, headline },
      {
        withCredentials: true,
      }
    );

    return dispatch({
      type: UPDATE_USER_DETAIL,
      payload: res.data.userDetail,
    });
  } catch (err) {
    // handle error here
  }
};

export const updateUserSecurity = (security) => async (dispatch) => {
  try {
    const {
      firstName,
      lastName,
      currentPassword,
      password,
      repeatPassword,
      email,
    } = security;

    if (password !== repeatPassword)
      throw new Error("Password and Repeat Password do not match.");

    const res = await axios.put(
      `${process.env.REACT_APP_SERVER}/api/user`,
      {
        firstName,
        lastName,
        currentPassword,
        password,
        email,
      },
      { withCredentials: true }
    );

    return dispatch({
      type: UPDATE_USER_SECURITY,
      payload: res.data.user,
    });
  } catch (err) {
    // handle error here

    console.log(err);
  }
};
