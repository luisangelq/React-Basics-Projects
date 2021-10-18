import { useReducer } from "react";

import taskContext from "./TaskContext";
import taskReducer from "./TaskReducer";
import { GET_TASKS } from "../../types";

const TaskState = (props) => {
  const tasks = [];

  const initialState = {
    tasks: [
      { name: "Do Chores and set the closet by colors", state: true, projectId: 1 },
      { name: "Cook Dinner", state: false, projectId: 2 },
      { name: "Clean House", state: false, projectId: 1 },
      { name: "Wash Car", state: true, projectId: 2 },
      { name: "Go to Gym", state: true, projectId: 2 },
    ],
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

  return (
    <taskContext.Provider
      value={{
        tasks: state.tasks,
        getTasksFn,
      }}
    >
      {props.children}
    </taskContext.Provider>
  );
};

export default TaskState;
