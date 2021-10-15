import styled from "styled-components";

const Task = ({ task }) => {
  return (
    <Li>
      <p>{task.name}</p>

      <TaskState>
        {task.state ? (
          <button type="button" className="complete">
            Complete
          </button>
        ) : (
          <button type="button" className="incomplete">
            Incomplete
          </button>
        )}
      </TaskState>

      <Actions>
        <button type="button" className="edit">
          Edit
        </button>
        <button type="button" className="delete">
          Delete
        </button>
      </Actions>
    </Li>
  );
};

const Li = styled.li`
  display: grid;
  grid-template-columns: 3fr 1fr 2fr;
  background-color: var(--white);
  padding: 0.5rem 2rem;
  align-items: center;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 10px -3px rgba(117, 117, 117, 1);

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;
const TaskState = styled.div`
  display: flex;
  margin-right: 1rem;
  justify-content: center;

  button {
    width: 100%;
    font-weight: bold;
    font-family: var(--textFont);
    font-size: 1.1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    border: none;
    margin-right: 1rem;
    padding: 0.5rem;
    color: var(--black);
  }

  @media (max-width: 480px) {
    button {
      width: 100px;
      margin-bottom: 1rem;
    }
  }

  .complete {
    background-color: rgba(40, 167, 69, 0.4);
    color: var(--black);
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: rgba(40, 167, 69, 0.3);
    }
  }

  .incomplete {
    background-color: rgba(255, 0, 0, 0.4);
    color: var(--black);
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: rgba(255, 0, 0, 0.3);
    }
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-around;

  button {
    width: 100%;
    font-weight: bold;
    font-family: var(--textFont);
    font-size: 1.2rem;
    border-radius: 0.5rem;
    cursor: pointer;
    border: none;
    margin-right: 1rem;
    padding: 1rem;
    background-color: var(--blue2);
    color: var(--white);
    transition: all 0.2s ease-in-out;
  }

  @media (max-width: 480px) {
    button {
      margin-bottom: 1rem;
    }
  }

  .edit:hover {
    opacity: 80%;
  }

  .delete:hover {
    background-color: rgba(255, 0, 0, 0.7);
  }
`;

export default Task;
