import { useContext } from "react";
import styled from "styled-components";
import Task from "./Task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

import ProjectContext from "../../context/projects/ProjectContext";
import TaskContext from "../../context/tasks/TaskContext";

const TaskList = () => {
  const projectContext = useContext(ProjectContext);
  const { currentProject, deleteProjectFn } = projectContext;

  const taskContext = useContext(TaskContext);
  const { projectTasks } = taskContext;

  if (!currentProject) return <Title>Select Some Project</Title>;

  const [project] = currentProject;

  const handleDelete = () => {
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
        deleteProjectFn(project.id);
        Swal.fire({
          title: "Deleted!",
          text: "Your Project Has Been Deleted",
          icon: "success",
          confirmButtonColor: "#20525c",
        });
      }
    });
  };

  return (
    <TaskContainer>
      <Title>
        Project: <span>{project.name}</span>{" "}
      </Title>

      <Ul>
        {projectTasks.length === 0 ? (
          <li>
            <p>There Are No Tasks</p>
          </li>
        ) : (
          projectTasks.map((task) => <Task key={task.name} task={task} />)
        )}
      </Ul>

      <DeleteProject>
        <button onClick={() => handleDelete()}>
          Delete Project
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </DeleteProject>
    </TaskContainer>
  );
};

const Title = styled.h2`
  color: var(--blue2);
  margin-top: 4rem;

  span {
    font-weight: normal;
  }
`;
const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 40rem;
  padding: 0 2rem;
`;

const Ul = styled.ul`
  max-width: 800px;
  margin: 0 auto;

  p {
    font-size: 1.8rem;
    text-align: center;
  }
`;

const DeleteProject = styled.div`
  display: flex;
  justify-content: center;

  button {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    background-color: rgba(255, 0, 0, 0.8);
    color: var(--white);
    border: none;
    padding: 1rem;
    margin: 4rem 0;
    border-radius: 1rem;
    font-size: 1.8rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: rgba(255, 0, 0, 0.6);
    }
  }
`;

export default TaskList;
