import { CREATE_PROJECT, SUBMIT_PROJECT, ALL_PROJECTS } from "../../const";
import axios from "axios";

export const createProject = field => dispatch => {
  return dispatch({
    type: CREATE_PROJECT,
    payload: field,
  });
};

export const submitProject = (project, cb) => async dispatch => {
  try {
    await axios.post(`${process.env.REACT_APP_SERVER}/api/project`, project, {
      withCredentials: true,
    });

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

export const getAllProjects = () => async dispatch => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/project`);

    return dispatch({
      type: ALL_PROJECTS,
      payload: res.data.projects,
    });
  } catch (err) {
    console.log(err);

    // handle error
  }
};
