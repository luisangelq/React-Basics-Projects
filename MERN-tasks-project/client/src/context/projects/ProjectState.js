import { useReducer } from "react";

import projectContext from "./ProjectContext";
import projectReducer from "./ProjectReducer";
import axiosClient from "../../config/axios";
import {
  NEW_PROJECT_FORM,
  GET_PROJECTS,
  ADD_PROJECT,
  CURRENT_PROJECT,
  SELECT_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  ERROR_PROJECT,
  RESET_PROJECT_ALERT,
} from "../../types";

const ProjectState = (props) => {
  const initialState = {
    projects: [],
    newProjectForm: false,
    currentProject: null,
    selectToEdit: null,
    alert: null,
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
    dispatch({
      type: CURRENT_PROJECT,
      payload: projectId,
    });
  };

  const selectProjectFn = (project) => {
    dispatch({
      type: SELECT_PROJECT,
      payload: project,
    });
  };

  //Update project
  const updateProjectFn = async (project) => {
    try {
      const res = await axiosClient.put(
        `/api/projects/${project._id}`,
        project
      );
      dispatch({
        type: UPDATE_PROJECT,
        payload: res.data,
      });

      getProjectsFn();
    } catch (error) {
      console.log(error);
    }
  };

  //Reset Alert
  const resetProjectAlertFn = () => {
    dispatch({
      type: RESET_PROJECT_ALERT,
    });
  };

  //Delete the project
  const deleteProjectFn = async (projectId) => {
    try {
      await axiosClient.delete(`/api/projects/${projectId}`);
      dispatch({
        type: DELETE_PROJECT,
        payload: projectId,
      });
    } catch (error) {
      console.log(error.response);

      dispatch({
        type: ERROR_PROJECT,
        payload: error.response.data.msg,
      });
    }
  };

  return (
    <projectContext.Provider
      value={{
        projects: state.projects,
        newProjectForm: state.newProjectForm,
        project: state.project,
        currentProject: state.currentProject,
        selectToEdit: state.selectToEdit,
        alert: state.alert,
        showNewProjectFormFn,
        getProjectsFn,
        addProjectFn,
        currentProjectFn,
        selectProjectFn,
        updateProjectFn,
        deleteProjectFn,
        resetProjectAlertFn,
      }}
    >
      {props.children}
    </projectContext.Provider>
  );
};

export default ProjectState;
