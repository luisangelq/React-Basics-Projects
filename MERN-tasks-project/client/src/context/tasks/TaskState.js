import { useReducer } from "react";

import taskContext from "./TaskContext";
import taskReducer from "./TaskReducer";
import { GET_TASKS, ADD_TASK } from "../../types";

const TaskState = (props) => {

  const initialState = {
    tasks: [
      {id: 1, name: "Do Chores and set the closet by colors", state: true, projectId: 1 },
      {id: 2, name: "Cook Dinner", state: false, projectId: 2 },
      {id: 3, name: "Clean House", state: false, projectId: 2 },
      {id: 4, name: "Wash Car", state: true, projectId: 2 },
      {id: 5, name: "Go to Gym", state: true, projectId: 2 },
    ],
    projectTasks: []
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
      payload: task
    })
  }

  return (
    <taskContext.Provider
      value={{
        tasks: state.tasks,
        projectTasks: state.projectTasks,
        getTasksFn,
        addTaskFn
      }}
    >
      {props.children}
    </taskContext.Provider>
  );
};

export default TaskState;
