import { useContext, useEffect } from "react";
import styled from "styled-components";
import Project from "./Project";

import ProjectContext from "../../context/projects/ProjectContext";

const ProjectsList = () => {
  const getProjectState = useContext(ProjectContext);
  const { projects, getProjectsFn } = getProjectState;

  //Get projects on component mount
  useEffect(() => {
    getProjectsFn();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (projects.length === 0) {
    return <Title>No projects</Title>;
  } else {
    return (
      <ul>
        <Title>Your Projects</Title>
        {projects.map((project) => (
          <Project key={project.id} project={project} />
        ))}
      </ul>
    );
  }
};

const Title = styled.p`
  margin: 4rem 0;
  color: var(--blue2);
  font-weight: bold;
  text-align: center;
  font-size: 2rem;
`;

export default ProjectsList;
