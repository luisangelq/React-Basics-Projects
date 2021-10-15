import styled from "styled-components";
import NewProject from "../projects/NewProject";
import ProjectsList from "../projects/ProjectsList"; 

const Sidebar = () => {
  return (
    <Aside>
      <h1>
        MERN <span>Task</span>
      </h1>

      <NewProject />
      <Projects>
        <ProjectsList />
      </Projects>
    </Aside>
  );
};

const Aside = styled.aside`
  background-color: var(--green3);
  min-width: 250px;

  @media (max-width: 768px) {
    padding-top: 15rem;
  }
`;
const Projects = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 5rem;
`;
export default Sidebar;
