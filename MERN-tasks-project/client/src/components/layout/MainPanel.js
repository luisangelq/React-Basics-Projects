import { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Header from "./Header";
import FormTask from "../tasks/FormTask";
import TaskList from "../tasks/TasksList";

import ProjectContext from "../../context/projects/ProjectContext";
import AuthContext from "../../context/auth/AuthContext";

const MainPanel = () => {
  const {
    currentProject,
    selectToEdit,
    alert,
    showNewProjectFormFn,
    resetProjectAlertFn,
    selectProjectFn,
    deleteProjectFn,
  } = useContext(ProjectContext);
  const { user, getLoggedUser, resetAlert, logout } = useContext(AuthContext);

  useEffect(() => {
    if (!alert) return;

    if (alert.type === "error") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: alert.msg,
        timer: 3000,
        confirmButtonColor: "#20525c",
      });
    }
    resetProjectAlertFn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert]);

  useEffect(() => {
    getLoggedUser();
    resetAlert("login");
    // eslint-disable-next-line
  }, []);

  const editProject = (project) => {
    showNewProjectFormFn(true);

    if (selectToEdit) {
      console.log(selectToEdit);
      if (selectToEdit._id === project._id) {
        selectProjectFn(null);
      } else {
        selectProjectFn(project);
      }
    } else {
      selectProjectFn(project);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FA312D",
      cancelButtonColor: "#20525c",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProjectFn(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your Project Has Been Deleted",
          icon: "success",
          confirmButtonColor: "#20525c",
        });
      }
    });
  };

  return (
    <Page>
      <Sidebar />

      <Panel>
        <main>
          <Header user={user} logout={logout}  />
          <FormTask/>

          <TaskList />
        </main>
        {currentProject ? (
          <ProjectActions>
            {selectToEdit ? (
              <button
                className="btn-update"
                onClick={() => editProject(currentProject[0])}
              >
                Cancel
                <FontAwesomeIcon icon={faTimesCircle} />
              </button>
            ) : (
              <a href="#projectForm"><button
              className="btn-update"
              onClick={() => editProject(currentProject[0])}
            >
              Edit Project
              <FontAwesomeIcon icon={faEdit} />
            </button></a>
              
            )}

            <button
              className="btn-delete"
              onClick={() => handleDelete(currentProject[0]._id)}
            >
              Delete Project
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </ProjectActions>
        ) : null}
      </Panel>
    </Page>
  );
};

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    height: 50rem;
    
  }
`;

const ProjectActions = styled.div`
  display: flex;
  justify-content: space-evenly;

  .btn-delete {
    background-color: #fa312d;
  }
  .btn-update {
    background-color: var(--blue2);
  }

  button {
    display: flex;
    justify-content: space-between;
    width: 16rem;
    gap: 1rem;
    color: var(--white);
    border: none;
    padding: 1rem;
    border-radius: 1rem;
    margin: 5rem 0;
    font-size: 1.8rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      opacity: 80%;
    }

    @media (max-width: 768px) {
    margin-top: 10rem;
    font-size: 1.5rem;
    width: 14rem;
  }
  }

  
`;

const Page = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 3fr;
  height: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    
  }
`;

export default MainPanel;
