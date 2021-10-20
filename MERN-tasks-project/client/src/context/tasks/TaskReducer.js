import {
  GET_TASKS,
  ADD_TASK,
  STATE_TASK,
  CURRENT_TASK,
  DELETE_TASK,
} from "../../types";

const TaskReducer = (state, action) => {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        projectTasks: state.tasks.filter(
          (task) => task.projectId === action.payload
        ),
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      };
    case STATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, state: action.payload.state }
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
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    default:
      return state;
  }
};

export default TaskReducer;
