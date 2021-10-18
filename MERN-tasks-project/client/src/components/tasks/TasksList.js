import { Fragment, useContext } from "react";
import styled from "styled-components";
import Task from "./Task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import ProjectContext from "../../context/projects/ProjectContext";

const TaskList = () => {
  const getTaskInfo = useContext(ProjectContext);
  const { currentProject, deleteProjectFn } = getTaskInfo;

  if (!currentProject) return <h2>Select Some Project</h2>;

  const [project] = currentProject;

  const tasks = [
    { name: "Do Chores and set the closet by colors", state: true },

    { name: "Cook Dinner", state: false },
    { name: "Clean House", state: false },
    { name: "Wash Car", state: true },
    { name: "Go to Gym", state: true },
  ];

  return (
    <Fragment>
      <h2>Project: {project.name} </h2>

      <Ul>
        {tasks.length === 0 ? (
          <li>
            <p>There Are No Tasks</p>
          </li>
        ) : (
          tasks.map((task) => <Task key={task.name} task={task} />)
        )}
      </Ul>

      <DeleteProject>
        <button onClick={() => deleteProjectFn(project.id)}>
          Delete Project
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </DeleteProject>
    </Fragment>
  );
};

const Ul = styled.ul`
  max-width: 800px;
  margin: 0 auto;

  p {
    font-size: 1.8rem;
    padding-right: 2rem;
    text-align: center;
  }
`;

const DeleteProject = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;

  button {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    background-color: rgba(255, 0, 0, 0.8);
    color: var(--white);
    border: none;
    padding: 1rem;
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
