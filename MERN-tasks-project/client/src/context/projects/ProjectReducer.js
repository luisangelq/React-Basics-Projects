import { NEW_PROJECT_FORM, ADD_PROJECT, GET_PROJECTS } from "../../types"

const ProjectReducer = (state, action) => {
  switch (action.type) {
    case NEW_PROJECT_FORM:
        return {
            ...state,
            newProjectForm: action.payload,
        }
    case GET_PROJECTS:
        return {
            ...state,
            projects: action.payload,
        }
    case ADD_PROJECT:
        return {
            ...state,
            projects: [action.payload, ...state.projects ]
        }
      default:
          return state;
  }
}

export default ProjectReducer;