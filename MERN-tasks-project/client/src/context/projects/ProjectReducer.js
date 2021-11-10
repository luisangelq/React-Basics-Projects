import {
  NEW_PROJECT_FORM,
  ADD_PROJECT,
  GET_PROJECTS,
  CURRENT_PROJECT,
  SELECT_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  ERROR_PROJECT,
  RESET_PROJECT_ALERT,
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
        projects: action.payload.projects,
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [action.payload.project, ...state.projects],
      };
    case CURRENT_PROJECT:
      return {
        ...state,
        currentProject: state.projects.filter(
          (project) => project._id === action.payload
        ),
      };
    case SELECT_PROJECT:
      return {
        ...state,
        selectToEdit: action.payload,
      };
    case UPDATE_PROJECT:
      return {
        ...state,
        projects: state.projects.map((project) =>
          project._id === action.payload._id ? action.payload : project
        ),
      };

    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project._id !== action.payload
        ),
        currentProject: null,
      };
    case ERROR_PROJECT:
      return {
        ...state,
        alert: { msg: action.payload, type: "error" },
      };
    case RESET_PROJECT_ALERT:
      return {
        ...state,
        alert: null,
      };
    default:
      return state;
  }
};

export default ProjectReducer;
