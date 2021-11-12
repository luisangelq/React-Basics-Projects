import { useContext } from "react";
import styled from "styled-components";
import Task from "./Task";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import ProjectContext from "../../context/projects/ProjectContext";
import TaskContext from "../../context/tasks/TaskContext";

const TaskList = () => {
  const { currentProject } = useContext(ProjectContext);
  const { projectTasks } = useContext(TaskContext);

  if (!currentProject) return <Title>Select Some Project</Title>;

  return (
    <TaskContainer>
      <Title>
        Project: <span>{currentProject[0].projectName}</span>{" "}
      </Title>

      <Ul>
        {projectTasks.length === 0 ? (
          <li>
            <p>There Are No Tasks</p>
          </li>
        ) : (
          <TransitionGroup>
            {projectTasks.map((task) => (
              <CSSTransition key={task._id} timeout={1000} classNames="transition">
                <Task task={task} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </Ul>
    </TaskContainer>
  );
};

const Title = styled.h2`
  color: var(--blue2);
  margin-top: 2rem;

  span {
    font-weight: normal;
  }
`;
const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;

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

export default TaskList;
