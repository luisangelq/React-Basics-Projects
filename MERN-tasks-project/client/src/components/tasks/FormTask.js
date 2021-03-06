import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

import ProjectContext from "../../context/projects/ProjectContext";
import TaskContext from "../../context/tasks/TaskContext";

const FormTask = () => {
  const projectContext = useContext(ProjectContext);
  const { currentProject } = projectContext;

  const taskContext = useContext(TaskContext);
  const { currentTask, currentTaskFn, updateTaskFn, addTaskFn } = taskContext;

  const [task, setTask] = useState({
    taskName: "",
  });

  useEffect(() => {
    if (currentTask) {
      setTask(currentTask);
    } else {
      setTask({
        taskName: "",
      });
    }
  }, [currentTask]);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(currentProject[0]._id);

    if (task.taskName.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Task Name Is Required",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    if (currentTask === null) {
      addTaskFn({
        projectId: currentProject[0]._id,
        ...task,
      });
    } else {
      updateTaskFn(task);
      Swal.fire({
        icon: "success",
        title: "Task Updated",
        showConfirmButton: false,
        timer: 1500,
      });

      currentTaskFn(null);
    }

    setTask({
      taskName: "",
    });
  };

  if (!currentProject) return null;

  return (
    <Form onSubmit={handleSubmit}>
      <Inputcontainer>
        <input
          type="text"
          name="taskName"
          placeholder="Add a task"
          value={task.taskName}
          onChange={handleChange}
        />
        {currentTask ? (
          <button type="submit">
            Update
            <FontAwesomeIcon icon={faEdit} />
          </button>
        ) : (
          <button type="submit">
            Add
            <FontAwesomeIcon icon={faPlus} />
          </button>
        )}
      </Inputcontainer>
    </Form>
  );
};

const Form = styled.form`
  padding: 4rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Inputcontainer = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  input {
    width: 100%;
    padding: 1rem;
    border: none;
    border-radius: 1rem;
    margin-right: 1rem;
    border-bottom: 2px solid transparent;
    box-shadow: 0px 4px 10px -3px rgba(117, 117, 117, 1);

    &:focus {
      outline: none;
      border-bottom: 2px solid var(--blue2);
    }
  }

  button {
    display: flex;
    justify-content: space-around;
    width: 10rem;
    background-color: var(--blue2);
    color: var(--white);
    padding: 1rem;
    border: none;
    border-radius: 1rem;
    gap: 1rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      opacity: 80%;
    }

    @media (max-width: 768px) {
      margin-top: 2rem;
      width: 100%;
      justify-content: center;
      gap: 1rem;
    }
  }
`;

export default FormTask;
