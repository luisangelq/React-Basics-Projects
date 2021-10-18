import { useReducer } from "react";

import projectContext from "./ProjectContext";
import projectReducer from "./ProjectReducer";
import {
  NEW_PROJECT_FORM,
  GET_PROJECTS,
  ADD_PROJECT,
  CURRENT_PROJECT,
  DELETE_PROJECT
} from "../../types";

const ProjectState = (props) => {
  const projects = [
    { id: 1, name: "Learn GitHub" },
    { id: 2, name: "Invest on Crypto" },
  ];

  const initialState = {
    projects: [],
    newProjectForm: false,
    currentProject: null,
  };

  //Dispath actions
  const [state, dispatch] = useReducer(projectReducer, initialState);

  //CRUD actions
  const showNewProjectFormFn = (option) => {
    dispatch({
      type: NEW_PROJECT_FORM,
      payload: option,
    });
  };

  const getProjectsFn = () => {
    dispatch({
      type: GET_PROJECTS,
      payload: projects,
    });
  };

  const addProjectFn = (project) => {
    dispatch({
      type: ADD_PROJECT,
      payload: project,
    });
  };

  //Select the project
  const currentProjectFn = (projectId) => {
    dispatch({
      type: CURRENT_PROJECT,
      payload: projectId
    })
  }

  //Delete the project
  const deleteProjectFn = (projectId) => {
    dispatch({
      type: DELETE_PROJECT,
      payload: projectId
    })
  }

  return (
    <projectContext.Provider
      value={{
        projects: state.projects,
        newProjectForm: state.newProjectForm,
        project: state.project,
        currentProject: state.currentProject,
        showNewProjectFormFn,
        getProjectsFn,
        addProjectFn,
        currentProjectFn,
        deleteProjectFn
      }}
    >
      {props.children}
    </projectContext.Provider>
  );
};

export default ProjectState;
