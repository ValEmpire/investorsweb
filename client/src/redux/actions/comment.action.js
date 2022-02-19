import { CREATE_COMMENT, GET_ALL_COMMENTS } from "../../const";
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

export const getAllComments = projectId => async dispatch => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/comment/${projectId}`,
      {
        withCredentials: true,
      }
    );

    const comments = res.data.comments;

    return dispatch({
      type: GET_ALL_COMMENTS,
      payload: comments,
    });
  } catch (err) {
    handleError(err, dispatch);

    return;
  }
};
