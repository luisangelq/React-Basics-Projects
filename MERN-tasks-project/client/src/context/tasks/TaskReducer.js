import { GET_TASKS, ADD_TASK } from "../../types";

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
    default:
      return state;
  }
};

export default TaskReducer;
