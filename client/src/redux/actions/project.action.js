import {
  CREATE_PROJECT,
  SUBMIT_PROJECT,
  ALL_PROJECTS,
  TOGGLE_FAVORITE_PROJECT,
  GET_PROJECT,
} from "../../const";
import axios from "axios";

export const createProject = field => dispatch => {
  return dispatch({
    type: CREATE_PROJECT,
    payload: field,
  });
};

export const submitProject = project => async dispatch => {
  try {
    await axios.post(`${process.env.REACT_APP_SERVER}/api/project`, project, {
      withCredentials: true,
    });

    return dispatch({
      type: SUBMIT_PROJECT,
      payload: "from api",
    });
  } catch (err) {
    console.log(err);

    // handle error
  }
};

export const getAllProjects = (progress, industry, sort) => async dispatch => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/project/?progress=${progress}&industry=${industry}&sort=${sort}`
    );

    return dispatch({
      type: ALL_PROJECTS,
      payload: res.data.projects,
    });
  } catch (err) {
    console.log(err);

    // handle error
  }
};

export const toggleProjectFavorite = projectId => async dispatch => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/favorite/${projectId}`,
      {},
      { withCredentials: true }
    );

    return dispatch({
      type: TOGGLE_FAVORITE_PROJECT,
    });
  } catch (err) {
    console.log(err);
    return;
  }
};

export const getProject = projectId => async dispatch => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/project/${projectId}`,
      {
        withCredentials: true,
      }
    );

    return dispatch({
      type: GET_PROJECT,
      payload: { project: res.data.project, isFavorite: res.data.isFavorite },
    });
  } catch (err) {
    console.log(err);
    return;
  }
};
