import {
  LOGOUT_USER,
  UPDATE_IMAGE,
  UPDATE_USER_DETAIL,
  UPDATE_USER_SECURITY,
} from "../../const";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  userDetail: {},
  image: {},
  accountId: "",
  customerId: "",
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_SECURITY:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
      };

    case UPDATE_USER_DETAIL:
      return {
        ...state,
        userDetail: action.payload,
      };

    case UPDATE_IMAGE:
      return {
        ...state,
        image: action.payload,
      };

    case LOGOUT_USER:
      return {
        ...initialState,
      };

    default:
      return { ...state };
  }
};
