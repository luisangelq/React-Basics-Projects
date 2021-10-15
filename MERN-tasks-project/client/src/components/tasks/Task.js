import styled from "styled-components";

const Task = ({ task }) => {
  return (
    <Li>
      <p>{task.name}</p>

      <TaskState>
        {task.state ? (
          <button type="button" className="complete">Complete</button>
        ) : (
          <button type="button" className="incomplete">Incomplete</button>
        )}
      </TaskState>
    </Li>
  );
};

const Li = styled.li`
  display: flex;
  justify-content: space-between;
  background-color: var(--white);
  padding: 0.5rem 2rem;
  align-items: center;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 10px -3px rgba(117,117,117,1);
`;
const TaskState = styled.div`
  margin-right: 1rem;

  button {
    font-weight: 900;
    font-family: var(--textFont);
    font-size: 1rem;
    padding: 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    border: none;
  }
`;

export default Task;
