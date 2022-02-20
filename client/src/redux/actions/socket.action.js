import { SET_SOCKET } from "../../const";
import { handleError } from "../../helpers/alert.handler";
import { connectSocket } from "../../socket";

export const setSocket = () => async dispatch => {
  try {
    const socket = await connectSocket();

    dispatch({
      type: SET_SOCKET,
      payload: socket,
    });

    return;
  } catch (err) {
    handleError(err, dispatch);
  }
};
