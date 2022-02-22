import {
  LOGOUT_USER,
  UPDATE_USER_DETAIL,
  UPDATE_USER_SECURITY,
  SET_LOADING_REGISTER,
  SET_LOADING_LOGIN,
  UPDATE_USER_IMAGE,
} from "../../const";
import axios from "axios";
import Cookies from "js-cookie";
import { handleError, handleSuccess } from "../../helpers/alert.handler";

// firebase
import { storage } from "../../firebase";
import { ref, uploadBytesResumable } from "@firebase/storage";
import {
  capitalizeFirstLetter,
  generateFileName,
} from "../../helpers/allHelpers";

// socket
import { registerNotification } from "../../socket";

export const registerUser =
  ({ firstName, lastName, email, password }) =>
  async dispatch => {
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

      await registerNotification(capitalizeFirstLetter(firstName));

      Cookies.set("isAuthenticated", true);

      window.location.replace("/");

      return;
    } catch (err) {
      dispatch({
        type: SET_LOADING_REGISTER,
        payload: false,
      });

      return handleError(err, dispatch, SET_LOADING_REGISTER);
    }
  };

export const loginUser =
  ({ email, password }) =>
  async dispatch => {
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

      return;
    } catch (err) {
      dispatch({
        type: SET_LOADING_LOGIN,
        payload: false,
      });

      return handleError(err, dispatch);
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
      image: res.data.user.image || {},
    };
  } catch (err) {
    // if error happens remove cookie
    Cookies.remove("isAuthenticated");

    return new Error("Invalid token");
  }
};

export const logoutUser = () => async dispatch => {
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

export const updateUserDetail = userDetail => async dispatch => {
  try {
    const { city, province, phoneNumber, headline } = userDetail;

    const res = await axios.put(
      `${process.env.REACT_APP_SERVER}/api/userdetail`,
      { city, province, phoneNumber, headline },
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: UPDATE_USER_DETAIL,
      payload: res.data.userDetail,
    });

    handleSuccess("User details was successfuly updated.", dispatch);
  } catch (err) {
    handleError(err, dispatch);
  }
};

export const updateUserSecurity = security => async dispatch => {
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

    dispatch({
      type: UPDATE_USER_SECURITY,
      payload: res.data.user,
    });

    handleSuccess("User security was successfuly updated.", dispatch);
  } catch (err) {
    handleError(err, dispatch);
  }
};

export const uploadUserImage = (image, userId) => async dispatch => {
  try {
    const imageName = generateFileName();

    const userRef = ref(storage, `/user${userId}/${imageName}.jpeg`);

    const uploadTask = uploadBytesResumable(userRef, image);

    uploadTask.on(
      "state_changed",
      snapshot => {},
      err => handleError(err, dispatch),
      async () => {
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_SERVER}/api/image/user`,
            {
              fileName: `${imageName}.jpeg`,
            },
            {
              withCredentials: true,
            }
          );

          const { url } = res.data;

          handleSuccess("Image uploaded successfully.", dispatch);

          dispatch({
            type: UPDATE_USER_IMAGE,
            payload: {
              url,
            },
          });
          return;
        } catch (err) {
          handleError(err, dispatch);
        }
      }
    );
  } catch (err) {
    console.log(err);
    // handle error here
  }
};
