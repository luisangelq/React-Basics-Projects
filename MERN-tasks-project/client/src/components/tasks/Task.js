// import { useContext } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faCheck,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

// import ProjectContext from "../../context/projects/ProjectContext";

const Task = ({ task }) => {
  // const projectContext = useContext(ProjectContext);
  // const { currentProject, deleteProjectFn } = projectContext;

  return (
    <Li>
      <p>{task.name}</p>

      <TaskState>
        {task.state ? (
          <button type="button" className="complete">
            <FontAwesomeIcon icon={faCheck} />
          </button>
        ) : (
          <button type="button" className="incomplete">
            <FontAwesomeIcon icon={faClock} />
          </button>
        )}
      </TaskState>

      <Actions>
        <button type="button" className="edit">
          Edit
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button
          type="button"
          className="delete"
          // onClick={() => deleteProjectFn(5)}
        >
          Delete
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </Actions>
    </Li>
  );
};

const Li = styled.li`
  display: grid;
  grid-template-columns: 3fr 1fr 2fr;
  background-color: var(--white);
  padding: 1.5rem;
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
    width: 3rem;
    height: 3rem;
    font-weight: bold;
    font-family: var(--textFont);
    font-size: 1.4rem;
    border-radius: 100%;
    cursor: pointer;
    border: none;
    padding: 0;
    color: var(--blue2);
  }

  @media (max-width: 480px) {
    button {
      width: 4rem;
      height: 4rem;
      margin: 1.5rem;
    }
  }

  .complete {
    background-color: rgba(40, 167, 69, 0.4);
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: rgba(40, 167, 69, 0.3);
    }
  }

  .incomplete {
    background-color: rgba(255, 0, 0, 0.4);
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
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 0.5rem;
    width: 100%;
    font-weight: bold;
    font-family: var(--textFont);
    font-size: 1.2rem;
    border-radius: 1rem;
    border: none;
    margin-right: 1rem;
    padding: 1.2rem;
    background-color: var(--blue2);
    color: var(--white);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  @media (max-width: 480px) {
    button {
      margin-bottom: 1rem;
      justify-content: center;
      gap: 1rem;
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
