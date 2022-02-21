import { GET_ALL_USER_NOTIFICATIONS, UPDATE_NOTIFICATION } from "../../const";

const initialState = {
  body: "",
  href: "",
  isSeen: false,
  notification: {},
  notificationFields: {
    body: "",
    href: "",
    isSeen: false,
  },
  notifications: [],
};

export const notification = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USER_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };

    case UPDATE_NOTIFICATION:
      return {
        ...state,
        isSeen: (state.isSeen = true),
      };
    default:
      return { ...state };
  }
};
