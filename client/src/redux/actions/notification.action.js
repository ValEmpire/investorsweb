import { GET_ALL_USER_NOTIFICATIONS, UPDATE_NOTIFICATION } from "../../const";
import axios from "axios";
import { handleError } from "../../helpers/alert.handler";

export const getAllUserNotifications = () => async dispatch => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/notification/`,
      {
        withCredentials: true,
      }
    );

    const notifications = res.data.notifications;

    dispatch({
      type: GET_ALL_USER_NOTIFICATIONS,
      payload: notifications,
    });
  } catch (err) {
    handleError(err, dispatch);

    return;
  }
};

export const updateNotification = () => async dispatch => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_SERVER}/api/notification`,
      {},
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: UPDATE_NOTIFICATION,
      payload: res.data.updatedNotifications,
    });
    return;
  } catch (err) {
    handleError(err, dispatch);
  }
  return;
};
