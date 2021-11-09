import { useContext, useEffect } from "react";
import styled from "styled-components";
import Project from "./Project";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import ProjectContext from "../../context/projects/ProjectContext";

const ProjectsList = () => {
  const getProjectState = useContext(ProjectContext);
  const { projects, getProjectsFn } = getProjectState;

  //Get projects on component mount
  useEffect(() => {
    getProjectsFn();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!projects) {
    return <Title>No projects</Title>;
  } else {
    return (
      <ul>
        <Title>Your Projects</Title>
        <TransitionGroup>
          {projects.map((project) => (
            <CSSTransition key={project._id} timeout={500} classNames="transition">
              <Project  project={project} />
            </CSSTransition>
            
          ))}
        </TransitionGroup>
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
