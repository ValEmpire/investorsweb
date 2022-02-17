import {
  ALL_PROJECTS,
  CREATE_PROJECT,
  GET_PROJECT,
  TOGGLE_FAVORITE_PROJECT,
  UPDATE_PROJECT_IMAGE,
} from "../../const";

const initialState = {
  name: "",
  location: "",
  targetFund: "",
  story: "",
  website: "",
  industry: "",
  deadline: "",
  minInvestment: "",
  project: {},
  isFavorite: null,
  projectFields: {
    location: "",
    targetFund: "",
    story: "",
    website: "",
    industry: "",
    deadline: "",
    minInvestment: "",
    imageUrl: "",
    name: "",
  },
};

export const project = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PROJECT:
      // get property name
      const fieldName = Object.keys(action.payload)[0];

      // get property value
      const fieldValue = action.payload[fieldName];

      return {
        ...state,
        projectFields: {
          ...state.projectFields,
          [fieldName]: fieldValue,
        },
      };

    case ALL_PROJECTS:
      return {
        projects: action.payload,
      };

    case TOGGLE_FAVORITE_PROJECT:
      return {
        ...state,
        isFavorite: state.isFavorite ? false : true,
      };

    case GET_PROJECT:
      return {
        ...state,
        project: action.payload.project,
        isFavorite: action.payload.isFavorite,
        projectFields: {
          ...action.payload.project,
          imageUrl: action.payload.project.logo?.url,
        },
      };

    case UPDATE_PROJECT_IMAGE:
      console.log(action.payload);

      return {
        ...state,
        projectFields: {
          ...state.projectFields,
          imageUrl: action.payload,
        },
      };

    default:
      return { ...state };
  }
};
