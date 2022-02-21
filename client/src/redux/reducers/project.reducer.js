import {
  ALL_PROJECTS,
  ALL_PROJECT_INVESTMENTS,
  ALL_USER_PROJECTS,
  CREATE_PROJECT,
  CREATE_PROJECT_DRAFT,
  FAVORITE_PROJECTS,
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
  userProjects: [],
  favoriteProjects: [],
  projectInvestments: {},
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
        ...state,
        projects: action.payload,
      };

    case CREATE_PROJECT_DRAFT:
      return {
        ...state,
        userProjects: [...state.userProjects, action.payload],
      };

    case TOGGLE_FAVORITE_PROJECT:
      return {
        ...state,
        isFavorite: state.isFavorite ? false : true,
      };

    case FAVORITE_PROJECTS:
      return {
        ...state,
        favoriteProjects: action.payload,
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
      return {
        ...state,
        projectFields: {
          ...state.projectFields,
          imageUrl: action.payload,
        },
      };

    case ALL_USER_PROJECTS:
      return {
        ...state,
        userProjects: action.payload,
      };

    case ALL_PROJECT_INVESTMENTS:
      return {
        ...state,
        projectInvestments: action.payload,
      };

    default:
      return { ...state };
  }
};
