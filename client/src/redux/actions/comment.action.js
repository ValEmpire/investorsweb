import {
  ADD_REPLY,
  CREATE_COMMENT,
  GET_ALL_COMMENTS,
  UPDATE_COMMENTS,
} from "../../const";
import axios from "axios";
import { handleError, handleSuccess } from "../../helpers/alert.handler";

export const createComment = field => dispatch => {
  return dispatch({
    type: CREATE_COMMENT,
    payload: field,
  });
};

export const deleteComment = commentId => async dispatch => {
  try {
    await axios.delete(
      `${process.env.REACT_APP_SERVER}/api/comment/${commentId}`,
      {
        withCredentials: true,
      }
    );
    handleSuccess("Comment was delited successfully.", dispatch);
  } catch (err) {
    handleError(err, dispatch);

    return err;
  }
};

export const getAllComments = (projectId, cb) => async dispatch => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/comment/${projectId}`,
      {
        withCredentials: true,
      }
    );

    const comments = res.data.comments;

    dispatch({
      type: GET_ALL_COMMENTS,
      payload: comments,
    });

    cb(null, true);

    return;
  } catch (err) {
    handleError(err, dispatch);

    return;
  }
};

export const updateComments = comment => async dispatch => {
  try {
    dispatch({
      type: UPDATE_COMMENTS,
      payload: comment,
    });

    return;
  } catch (err) {
    handleError(err, dispatch);

    return;
  }
};

export const addReply = comment => async dispatch => {
  try {
    dispatch({
      type: ADD_REPLY,
      payload: comment,
    });

    return;
  } catch (err) {
    handleError(err, dispatch);

    return;
  }
};
