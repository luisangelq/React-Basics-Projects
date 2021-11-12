import { useContext } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faCheck,
  faClock,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

import TaskContext from "../../context/tasks/TaskContext";

const Task = ({ task }) => {
  const taskContext = useContext(TaskContext);
  const { currentTask, getTasksFn, updateTaskFn, currentTaskFn, deleteTaskFn } =
    taskContext;

  const changeState = (tasktate) => {
    updateTaskFn({
      ...task,
      state: tasktate
    });
  };

  const editTask = (task) => {
    if (currentTask) {
      if (currentTask._id === task._id) {
        currentTaskFn(null);
      } else {
        currentTaskFn(task);
      }
    } else {
      currentTaskFn(task);
    }
  };

  const handleDeleteTask = (id, projectId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FA312D",
      cancelButtonColor: "#20525c",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTaskFn(id, projectId);
        getTasksFn(projectId);
        Swal.fire({
          title: "Deleted!",
          text: "Your Task Has Been Deleted",
          icon: "success",
          confirmButtonColor: "#20525c",
        });
      }
    });
  };

  return (
    <Li>
      <p>{task.taskName}</p>

      <TaskState>
        {task.state ? (
          <button
            type="button"
            className="complete"
            onClick={() => changeState(task.state = false)}
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>
        ) : (
          <button
            type="button"
            className="incomplete"
            onClick={() => changeState(task.state = true)}
          >
            <FontAwesomeIcon icon={faClock} />
          </button>
        )}
      </TaskState>

      <Actions>
        {currentTask && currentTask._id === task._id ? (
          <button type="button" className="edit" onClick={() => editTask(task)}>
            Cancel
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>
        ) : (
          <button type="button" className="edit" onClick={() => editTask(task)}>
            Edit
            <FontAwesomeIcon icon={faEdit} />
          </button>
        )}

        <button
          type="button"
          className="delete"
          onClick={() => handleDeleteTask(task._id, task.projectId)}
        >
          Delete
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </Actions>
    </Li>
  );
};

const Li = styled.li`
  display: grid;
  grid-template-columns: 3fr 1fr 2fr;
  background-color: var(--white);
  padding: 1.5rem;
  align-items: center;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 10px -3px rgba(117, 117, 117, 1);

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;
const TaskState = styled.div`
  display: flex;
  justify-content: center;

  button {
    width: 3rem;
    height: 3rem;
    font-weight: bold;
    font-family: var(--textFont);
    font-size: 1.4rem;
    border-radius: 100%;
    cursor: pointer;
    border: none;
    padding: 0;
    color: var(--blue2);

    @media (max-width: 480px) {
      width: 4rem;
      height: 4rem;
      margin: 1.5rem;
    }
  }

  .complete {
    background-color: rgba(40, 167, 69, 0.4);
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: rgba(40, 167, 69, 0.3);
    }
  }

  .incomplete {
    background-color: rgba(255, 0, 0, 0.4);
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: rgba(255, 0, 0, 0.3);
    }
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-around;

  button {
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 0.5rem;
    width: 100%;
    min-width: 8rem;
    font-weight: bold;
    font-family: var(--textFont);
    font-size: 1.2rem;
    border-radius: 1rem;
    border: none;
    margin-right: 1rem;
    padding: 1.2rem;
    background-color: var(--blue2);
    color: var(--white);
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    @media (max-width: 480px) {
      margin-bottom: 1rem;
      justify-content: center;
      gap: 1rem;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .edit:hover {
    opacity: 80%;
  }

  .delete:hover {
    background-color: rgba(255, 0, 0, 0.7);
  }
`;

export default Task;
