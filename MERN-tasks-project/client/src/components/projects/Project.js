import { useContext } from "react";
import styled from "styled-components";
import ProjectContext from "../../context/projects/ProjectContext";
import TaskContext from "../../context/tasks/TaskContext";

const Project = ({ project }) => {
  const getProjectContext = useContext(ProjectContext);
  const { currentProjectFn } = getProjectContext;

  const getTaskContext = useContext(TaskContext);
  const { getTasksFn } = getTaskContext;

  const selectProject = (id) => {
    currentProjectFn(id);
    getTasksFn(id);
  };

  return (
    <List>
      <button type="button" onClick={() => selectProject(project._id)}>
        {project.projectName}
      </button>
    </List>
  );
};

const List = styled.li`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  button {
    font-family: var(--headingFont);
    color: rgba(0, 0, 0, 0.6);
    padding: 1.5rem;
    font-size: 1.4;
    font-weight: bold;
    border-radius: 0.5rem;
    border: none;
    transition: background-color 0.3s ease;
    background-color: transparent;
    cursor: pointer;
  }
  &:hover {
    border-bottom: 2px solid var(--blue2);

    button {
      color: var(--blue2);
    }
  }
`;

export default Project;
