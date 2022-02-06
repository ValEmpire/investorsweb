import { CREATE_PROJECT, SUBMIT_PROJECT } from "../../const";
import axios from "axios";

export const createProject = (field) => (dispatch) => {
  return dispatch({
    type: CREATE_PROJECT,
    payload: field,
  });
};

export const submitProject = (proj, cb) => async (dispatch) => {
  try {
    const project = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/project`,
      proj,
      {
        withCredentials: true,
      }
    );

    console.log(project);

    return dispatch({
      type: SUBMIT_PROJECT,
      payload: "from api",
    });
  } catch (err) {
    cb(err);
    console.log(err);

    // handle error
  }
};
