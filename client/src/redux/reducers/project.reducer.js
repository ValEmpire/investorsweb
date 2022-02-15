import {
  ALL_PROJECTS,
  CREATE_PROJECT,
  GET_PROJECT,
  TOGGLE_FAVORITE_PROJECT,
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
  projects: [],
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
        [fieldName]: fieldValue,
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
      };

    default:
      return { ...state };
  }
};
