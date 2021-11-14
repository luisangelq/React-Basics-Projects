import {
  GET_TASKS,
  ADD_TASK,
  CURRENT_TASK,
  UPDATE_TASK,
  DELETE_TASK,
} from "../../types";

const TaskReducer = (state, action) => {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        projectTasks: action.payload.tasks,
      };
    case ADD_TASK:
      return {
        ...state,
        projectTasks: [action.payload.task, ...state.projectTasks],
      };
    case UPDATE_TASK:
      return {
        ...state,
        projectTasks: state.projectTasks.map((task) =>
          task._id === action.payload._id
            ?  action.payload 
            : task
        ),
      };
    case CURRENT_TASK:
      return {
        ...state,
        currentTask: action.payload,
      };
    case DELETE_TASK:
      return {
        ...state,
        projectTasks: state.projectTasks.filter((task) => task._id !== action.payload),
      };
    default:
      return state;
  }
};

export default TaskReducer;
