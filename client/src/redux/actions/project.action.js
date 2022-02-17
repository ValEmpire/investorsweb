import {
  CREATE_PROJECT,
  SUBMIT_PROJECT,
  ALL_PROJECTS,
  TOGGLE_FAVORITE_PROJECT,
  GET_PROJECT,
  UPDATE_PROJECT_IMAGE,
} from "../../const";
import axios from "axios";

// firebase
import { storage } from "../../firebase";
import { ref, uploadBytesResumable } from "@firebase/storage";

import { handleError, handleSuccess } from "../../helpers/alert.handler";
import { generateFileName } from "../../helpers/allHelpers";

export const createProjectDraft = () => async dispatch => {
  try {
    await axios.post(
      `${process.env.REACT_APP_SERVER}/api/project`,
      {},
      {
        withCredentials: true,
      }
    );

    handleSuccess("New project draft was successfuly created.", dispatch);

    return dispatch({
      type: SUBMIT_PROJECT,
      payload: "from api",
    });
  } catch (err) {
    handleError(err, dispatch);

    return;
  }
};

export const createProject = field => dispatch => {
  return dispatch({
    type: CREATE_PROJECT,
    payload: field,
  });
};

export const updateProject = (project, projectId) => async dispatch => {
  try {
    const {
      location,
      targetFund,
      story,
      website,
      industry,
      deadline,
      minInvestment,
      name,
    } = project;

    await axios.put(
      `${process.env.REACT_APP_SERVER}/api/project/${projectId}`,
      {
        location,
        targetFund,
        story,
        website,
        industry,
        deadline,
        minInvestment,
        name,
      },
      {
        withCredentials: true,
      }
    );

    return handleSuccess("Project was successfully updated.", dispatch);
  } catch (err) {
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

export const uploadProjectImage =
  (image, userId, projectId) => async dispatch => {
    try {
      const imageName = generateFileName();

      const userRef = ref(storage, `/user${userId}/${imageName}.jpeg`);

      const uploadTask = uploadBytesResumable(userRef, image);

      uploadTask.on(
        "state_changed",
        snapshot => {},
        err => handleError(err, dispatch),
        async () => {
          try {
            const res = await axios.post(
              `${process.env.REACT_APP_SERVER}/api/image/project`,
              {
                fileName: `${imageName}.jpeg`,
                projectId,
              },
              {
                withCredentials: true,
              }
            );

            const { url } = res.data;

            handleSuccess("Image uploaded successfully.", dispatch);

            dispatch({
              type: UPDATE_PROJECT_IMAGE,
              payload: url,
            });
            return;
          } catch (err) {
            handleError(err, dispatch);
          }
        }
      );
    } catch (err) {
      console.log(err);
      // handle error here
    }
  };

export const deleteProject = projectId => async dispatch => {
  try {
    await axios.delete(
      `${process.env.REACT_APP_SERVER}/api/project/${projectId}`,
      {
        withCredentials: true,
      }
    );

    handleSuccess("Project draft was deleted successfully.", dispatch);

    return;
  } catch (err) {
    handleError(err, dispatch);

    return err;
  }
};
