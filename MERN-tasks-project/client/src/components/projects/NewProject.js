import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

import ProjectContext from "../../context/projects/ProjectContext";

const NewProject = () => {
  const {
    newProjectForm,
    selectToEdit,
    showNewProjectFormFn,
    addProjectFn,
    selectProjectFn,
    updateProjectFn,
  } = useContext(ProjectContext);

  const [project, setProject] = useState({
    projectName: "",
  });

  useEffect(() => {
    if (selectToEdit) {
      setProject(selectToEdit);
    } else {
      setProject({
        projectName: "",
      });
    }
  }, [selectToEdit]);

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (project.projectName === "") {
      Swal.fire({
        icon: "error",
        title: "Name Is Required",
        showConfirmButton: false,
        timer: 1500,
      });

      return;
    }

    if (selectToEdit) {
      updateProjectFn(project);
      selectProjectFn(null);
      Swal.fire({
        icon: "success",
        title: "Project Updated",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      addProjectFn(project);
    }

    setProject({
      projectName: "",
    });
    showNewProjectFormFn(false);
  };

  return (
    <Container>
      {newProjectForm ? (
        <Form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Project Name"
            name="projectName"
            value={project.projectName}
            onChange={handleChange}
          />
          {selectToEdit ? (
            <Btn type="submit">Update Project</Btn>
          ) : (
            <Btn type="submit">Create Project</Btn>
          )}
        </Form>
      ) : (
        <Btn type="button" onClick={() => showNewProjectFormFn(true)}>
          New Project
        </Btn>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
`;

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
  width: 100%;
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
