import { REGISTER_USER } from "../../const";
import { LOGIN_USER } from "../../const";
import axios from "axios";

export const registerUser =
  ({ firstName, lastName, email, password }) =>
  async (dispatch) => {
    await axios.post(
      "http://localhost:8080/api/user/register",
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
  };

export const loginUser =
  ({ email, password }) =>
  async (dispatch) => {
    await axios.post(
      "http://localhost:8080/api/user/login",
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
  };
