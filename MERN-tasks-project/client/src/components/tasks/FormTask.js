import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const FormTask = () => {
  return (
    <Form>
      <Inputcontainer>
        <input
          type="text"
          name="task"
          placeholder="Add a task"
        />
        <button type="submit">
          Add
          <FontAwesomeIcon icon={faPlus} />  
        </button>
      </Inputcontainer>
    </Form>
  );
};

const Form = styled.form`
  padding: 4rem;
  max-width: 600px;
  margin: 0 auto;
`;

const Inputcontainer = styled.div`
    display: flex;

    @media (max-width: 768px) {
      flex-direction: column;
    }

  input {
    width: 100%;
    padding: 1rem;
    border: none;
    border-radius: 1rem;
    margin-right: 1rem;

    &:focus {
      outline: none;
    }
  }

  button {
    display: flex;
    justify-content: space-around;
    width: 10rem;
    background-color: var(--blue2);
    color: var(--white);
    padding: 1rem;
    
    border: none;
    border-radius: 1rem;
    cursor: pointer;

    @media (max-width: 768px) {
      margin-top: 2rem;
      width: 100%;
      justify-content: center;
      gap: 1rem;
    }
  }
`;

export default FormTask;
