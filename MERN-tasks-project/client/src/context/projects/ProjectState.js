import { useReducer } from "react";

import projectContext from "./ProjectContext";
import projectReducer from "./ProjectReducer";
import { NEW_PROJECT_FORM, GET_PROJECTS, ADD_PROJECT } from "../../types";

const ProjectState = (props) => {
  const projects = [
    { id: 1, name: "Learn GitHub" },
    { id: 2, name: "Invest on Crypto" },
  ];

  const initialState = {
    projects: [],
    newProjectForm: false,
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

  return (
    <projectContext.Provider
      value={{
        projects: state.projects,
        newProjectForm: state.newProjectForm,
        showNewProjectFormFn,
        getProjectsFn,
        addProjectFn,
      }}
    >
      {props.children}
    </projectContext.Provider>
  );
};

export default ProjectState;
