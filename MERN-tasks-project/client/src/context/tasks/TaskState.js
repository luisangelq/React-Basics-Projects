import { useReducer } from "react";

import taskContext from "./TaskContext";
import taskReducer from "./TaskReducer";
import {
  GET_TASKS,
  ADD_TASK,
  CURRENT_TASK,
  UPDATE_TASK,
  DELETE_TASK,
} from "../../types";
import axiosClient from "../../config/axios";

const TaskState = (props) => {
  const initialState = {
    projectTasks: [],
    currentTask: null,
  };

  //Dispatch actions
  const [state, dispatch] = useReducer(taskReducer, initialState);

  //Actions
  const getTasksFn = async (projectId) => {
    try {
      const res = await axiosClient.get(`/api/tasks`, {
        params: { projectId },
      });
      dispatch({
        type: GET_TASKS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addTaskFn = async (task) => {
    try {
      const res = await axiosClient.post("/api/tasks", task);
      dispatch({
        type: ADD_TASK,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const currentTaskFn = (task) => {
    dispatch({
      type: CURRENT_TASK,
      payload: task,
    });
  };

  const updateTaskFn = async (task) => {
    try {
      const res = await axiosClient.put(`/api/tasks/${task._id}`, task);
      
      dispatch({
        type: UPDATE_TASK,
        payload: res.data.task,
      });
    } catch (error) {
      console.log(error);
    
      
    }
    
  };

  const deleteTaskFn = async (taskId, projectId) => {
    try {
      await axiosClient.delete(`/api/tasks/${taskId}`, {params: {projectId}});
    
      dispatch({
        type: DELETE_TASK,
        payload: taskId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <taskContext.Provider
      value={{
        projectTasks: state.projectTasks,
        currentTask: state.currentTask,
        getTasksFn,
        addTaskFn,
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
