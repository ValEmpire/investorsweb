import { SET_SOCKET } from "../../const";

const initialState = {
  socket: null,
};

export const socket = (state = initialState, action) => {
  switch (action.type) {
    case SET_SOCKET:
      return {
        ...state,
        socket: action.payload,
      };

    default:
      return { ...state };
  }
};
