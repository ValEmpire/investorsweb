import { ALL_PROJECTS, CREATE_PROJECT, GET_PROJECT } from "../../const";

const initialState = {
  projectFields: {
    location: "",
    targetFund: "",
    story: "",
    website: "",
    industry: "",
    deadline: "",
    minInvestment: "",
    name: "",
  },
  projects: [],
  project: {},
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

    case GET_PROJECT:
      return {
        ...state,
        project: action.payload,
      };

    default:
      return { ...state };
  }
};
