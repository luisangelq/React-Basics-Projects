import { useContext, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

import ProjectContext from "../../context/projects/ProjectContext";
import TaskContext from "../../context/tasks/TaskContext";

const FormTask = () => {
  const projectContext = useContext(ProjectContext);
  const { currentProject } = projectContext;

  const taskContext = useContext(TaskContext);
  const { addTaskFn, getTasksFn } = taskContext;

  const [task, setTask] = useState({
    name: "",
    state: false,
  });

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(currentProject[0].id);

    if (task.name === "") {
      Swal.fire({
        icon: "error",
        title: "Name Is Required",
        showConfirmButton: false,
        timer: 1500,
      });

      return;
    }

    addTaskFn({
      id: Date.now(),
      ...task,
      projectId: currentProject[0].id,
    });

    setTask({
      name: "",
    });

    getTasksFn(currentProject[0].id);
  };

  if (!currentProject) return null;

  return (
    <Form onSubmit={handleSubmit}>
      <Inputcontainer>
        <input
          type="text"
          name="name"
          placeholder="Add a task"
          value={task.name}
          onChange={handleChange}
        />
        <button type="submit">
          Add
          <FontAwesomeIcon icon={faPlus} />
        </button>
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
