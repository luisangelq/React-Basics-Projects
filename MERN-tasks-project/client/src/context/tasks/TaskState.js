import { useReducer } from "react";

import taskContext from "./TaskContext";
import taskReducer from "./TaskReducer";
import {
  GET_TASKS,
  ADD_TASK,
  STATE_TASK,
  CURRENT_TASK,
  UPDATE_TASK,
  DELETE_TASK,
} from "../../types";

const TaskState = (props) => {
  const initialState = {
    tasks: [
      {
        id: 1,
        name: "Do Chores and set the closet by colors",
        state: true,
        projectId: 1,
      },
      { id: 2, name: "Cook Dinner", state: false, projectId: 2 },
      { id: 3, name: "Clean House", state: false, projectId: 2 },
      { id: 4, name: "Wash Car", state: true, projectId: 2 },
      { id: 5, name: "Go to Gym", state: true, projectId: 2 },
    ],
    projectTasks: [],
    currentTask: null,
  };

  //Dispatch actions
  const [state, dispatch] = useReducer(taskReducer, initialState);

  //Actions
  const getTasksFn = (projectId) => {
    dispatch({
      type: GET_TASKS,
      payload: projectId,
    });
  };

  const addTaskFn = (task) => {
    console.log(task);
    dispatch({
      type: ADD_TASK,
      payload: task,
    });
  };

  const stateTaskFn = (task) => {
    dispatch({
      type: STATE_TASK,
      payload: task,
    });
  };

  const currentTaskFn = (task) => {
    console.log(task);
    dispatch({
      type: CURRENT_TASK,
      payload: task,
    });
  };

  const updateTaskFn = (task) => {
    console.log(task);
    dispatch({
      type: UPDATE_TASK,
      payload: task,
    });
  }

  const deleteTaskFn = (taskId) => {
    dispatch({
      type: DELETE_TASK,
      payload: taskId,
    });
  };

  return (
    <taskContext.Provider
      value={{
        tasks: state.tasks,
        projectTasks: state.projectTasks,
        currentTask: state.currentTask,
        getTasksFn,
        addTaskFn,
        stateTaskFn,
        currentTaskFn,
        updateTaskFn,
        deleteTaskFn,
      }}
    >
      {props.children}
    </taskContext.Provider>
  );
};

export default TaskState;
