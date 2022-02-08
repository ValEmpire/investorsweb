import {
  REGISTER_USER,
  LOGIN_USER,
  GET_USER,
  LOGOUT_USER,
  UPDATE_USER_DETAIL,
} from "../../const";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  userDetail: {},
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
      };

    case LOGIN_USER:
      return {
        ...state,
      };

    case GET_USER:
      const { firstName, lastName, email, userDetail } = action.payload;
      return {
        ...state,
        firstName,
        lastName,
        email,
        userDetail,
      };

    case LOGOUT_USER:
      return {
        ...initialState,
      };

    case UPDATE_USER_DETAIL:
      return {
        ...state,
        userDetail: action.payload,
      };

    default:
      return { ...state };
  }
};
