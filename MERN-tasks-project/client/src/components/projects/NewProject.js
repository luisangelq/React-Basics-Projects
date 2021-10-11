import { Fragment, useState } from "react";
import styled from "styled-components";

const NewProject = () => {
  const [project, serProject] = useState({
    name: "",
  });

  const handleChange = (e) => {
    serProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(project);
  };

  return (
    <Fragment>
      <Btn>New Project</Btn>

      <Form 
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Project Name"
          name="name"
          value={project.name}
          onChange={handleChange}
        />
        <Btn type="submit">Create Project</Btn>
      </Form>
    </Fragment>
  );
};

const Btn = styled.button`
  width: 100%;
  background-color: var(--blue2);
  border: none;
  border-radius: 1rem;
  color: white;
  padding: 1rem;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 80%;
  }
`;

const Form = styled.form`
  input {
    width: 100%;
    border: none;
    border-radius: 1rem;
    background-color: var(--green1);
    padding: 1rem;
    margin: 4rem 0;
    border-bottom: 2px solid transparent;

    &:focus {
      outline: none;
      border-bottom: 2px solid var(--blue2);
    }
  }
`;

export default NewProject;
