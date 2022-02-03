import { REGISTER_USER, LOGIN_USER } from "../../const";
import axios from "axios";

export const registerUser =
  ({ firstName, lastName, email, password }) =>
  async (dispatch) => {
    try {
      await axios.post(
        "http://localhost:3001/api/user/register",
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
        "http://localhost:3001/api/user/login",
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
