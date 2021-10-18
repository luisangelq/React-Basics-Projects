import {
  NEW_PROJECT_FORM,
  ADD_PROJECT,
  GET_PROJECTS,
  CURRENT_PROJECT,
  DELETE_PROJECT,
} from "../../types";

const ProjectReducer = (state, action) => {
  switch (action.type) {
    case NEW_PROJECT_FORM:
      return {
        ...state,
        newProjectForm: action.payload,
      };
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [action.payload, ...state.projects],
      };
    case CURRENT_PROJECT:
      return {
        ...state,
        currentProject: state.projects.filter(
          (project) => project.id === action.payload
        ),
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.id !== action.payload
        ),
        currentProject: null,
      };
    default:
      return state;
  }
};

export default ProjectReducer;
