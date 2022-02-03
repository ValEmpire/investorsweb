import { REGISTER_USER, LOGIN_USER } from "../../const";
import axios from "axios";

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

      return dispatch({
        type: REGISTER_USER,
        payload: "from api server",
      });
    } catch (err) {
      // handle error
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

      return dispatch({
        type: LOGIN_USER,
        payload: "from api server",
      });
    } catch (err) {
      // handle error
    }
  };
