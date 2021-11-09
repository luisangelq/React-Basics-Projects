import { useReducer } from "react";

import projectContext from "./ProjectContext";
import projectReducer from "./ProjectReducer";
import axiosClient from "../../config/axios";
import {
  NEW_PROJECT_FORM,
  GET_PROJECTS,
  ADD_PROJECT,
  CURRENT_PROJECT,
  DELETE_PROJECT
} from "../../types";


const ProjectState = (props) => {
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

  const getProjectsFn = async () => {
    try {
      const res = await axiosClient.get("/api/projects");
      console.log(res);
      dispatch({
        type: GET_PROJECTS,
        payload: res.data,
      });
      
    } catch (error) {
      console.log(error.response);
    }
  };

  const addProjectFn = async (project) => {
    console.log(project);
    try {
      const res = await axiosClient.post("/api/projects", project);
      console.log(res);

      dispatch({
        type: ADD_PROJECT,
        payload: res.data,
      });
      
    } catch (error) {
      console.log(error);
      
    }
  };

  //Select the project
  const currentProjectFn = (projectId) => {
    console.log(projectId);
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
