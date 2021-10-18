import { useContext } from "react";
import styled from "styled-components";
import ProjectContext from "../../context/projects/ProjectContext";

const Project = ({ project }) => {
  const getProjectContext = useContext(ProjectContext);
  const { currentProjectFn } = getProjectContext;

  return (
    <List>
      <button type="button" onClick={() => currentProjectFn(project.id)}>
        {project.name}
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
