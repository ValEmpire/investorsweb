import {
  REGISTER_USER,
  LOGIN_USER,
  GET_USER,
  LOGOUT_USER,
  UPDATE_USER_DETAIL,
  UPDATE_USER_SECURITY,
  CREATE_ACCOUNT,
  CREATE_CUSTOMER,
} from "../../const";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  accountId: "",
  userDetail: {},
  customerId: "",
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

    case UPDATE_USER_SECURITY:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
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

    case UPDATE_USER_DETAIL:
      return {
        ...state,
        userDetail: action.payload,
      };

    case LOGOUT_USER:
      return {
        ...initialState,
      };

    case CREATE_ACCOUNT:
      return {
        ...state,
        accountId: action.payload,
      };

    case CREATE_CUSTOMER:
      return {
        ...state,
        customerId: action.payload,
      };

    default:
      return { ...state };
  }
};
