import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Spinner from "../layout/Spinner";

import AuthContext from "../../context/auth/AuthContext";

const Login = (props) => {
  const { alert, isAuthenticated, page, loginUser, resetAlert } =
    useContext(AuthContext);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    if (!alert) return;

    if (alert.type === "success" && page === "login") {
      Swal.fire({
        icon: alert.type,
        title: "Success!",
        text: alert.msg,
        timer: 3000,
        confirmButtonColor: "#20525c",
      });
    }
    if (alert.type === "error" && page === "login") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: alert.msg,
        timer: 3000,
        confirmButtonColor: "#20525c",
      });
    }

    resetAlert("login");

    if (isAuthenticated) {
      props.history.push("/main-panel");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert, isAuthenticated]);

  const { email, password } = user;

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all the fields!",
        timer: 3000,
        confirmButtonColor: "#20525c",
      });

      return;
    }

    setSpinner(true);

    setTimeout(() => {
      loginUser({
        email,
        password,
      });
      setSpinner(false);
    }, 500);
  };

  return (
    <UserForm>
      <ContentForm>
        <h1>Log In</h1>

        <form onSubmit={(e) => handleSubmit(e)}>
          <FieldForm>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your Email"
              value={email}
              onChange={handleChange}
            />
          </FieldForm>
          <FieldForm>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Your Password"
              value={password}
              onChange={handleChange}
            />
          </FieldForm>
          {spinner ? <Spinner /> : <div style={{ height: "5rem" }}></div>}
          <FieldForm>
            <Btn type="submit" value="Log In" />
          </FieldForm>
        </form>

        <SignUp to="/sign-up">Sign up</SignUp>
      </ContentForm>
    </UserForm>
  );
};

const UserForm = styled.div`
  background-color: var(--green3);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentForm = styled.div`
  padding: 5rem 3rem;
  max-width: 600px;
  width: 95%;
  background-color: var(--white);
  border-radius: 1rem;
  box-shadow: 0px 6px 11px -8px rgba(0, 0, 0, 0.9);
`;

const FieldForm = styled.div`
  display: flex;
  margin-bottom: 2rem;
  align-items: center;

  svg {
    width: 3rem;
    height: 3rem;
    margin-right: 1rem;
    fill: var(--green2);
  }

  input[type="password"],
  input[type="email"],
  input[type="text"] {
    background-color: var(--white);
    width: 100%;
    padding: 1rem;
    margin: 1rem 0;
    border: none;
    border-bottom: 2px solid var(--green2);
    font-size: 2rem;
    color: var(--black);
    font-family: var(--textFont);
  }

  input:focus {
    outline: none;
    border-bottom: 2px solid var(--green3);
  }
`;

const Btn = styled.input`
  margin-top: 2rem;
  background-color: var(--blue2);
  color: var(--white);
  width: 100%;
  padding: 1rem 2rem;
  border: none;
  border-radius: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 80%;
  }
`;

const SignUp = styled(Link)`
  color: var(--black);
  font-weight: bold;
  font-size: 1.8rem;
  margin-top: 2rem;
  opacity: 0.8;
  text-decoration: underline;
`;
export default Login;
