import styled from "styled-components";

const FormTask = () => {
  return (
    <Form>
      <Inputcontainer>
        <input
          type="text"
          name="task"
          placeholder="Add a task"
        />
        <button type="submit">Add</button>
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
    }
  }
`;

export default FormTask;
