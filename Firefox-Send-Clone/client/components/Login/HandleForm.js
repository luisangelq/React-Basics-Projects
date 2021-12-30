
import styled from "styled-components";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { errorAlert } from "../AlertHandler";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 0 solid #dae1e7;

  input {
    width: 100%;
    color: #606f7b;
    padding: 1rem 0.5rem;
    border: 1px solid #dae1e7;
    border-radius: 0.5rem;
    margin-bottom: 1rem;

    &:focus {
      outline: 1px solid #606f7b;
    }
  }

  button {
    width: 100%;
    padding: 1rem;
    border: none;
    border-radius: 0.5rem;
    background-color: #0060df;
    color: #fff;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: #003eaa;
    }
  }

  .lastBtns {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }
  a {
    color: #0060df;
    font-weight: bold;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const EmailForm = ({ emailExist }) => {
  //Validation with formik
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),

    onSubmit: (email) => {
      emailExist(email);
    },
  });

  if (formik.errors.email) {
    errorAlert(formik.errors);
    formik.setErrors({});
  }

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <input
          id="email"
          type="text"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />

        <button type="submit">Sign in/up</button>

        <Link href="/">
          <a>Cancel</a>
        </Link>
      </Form>
    </>
  );
};

const SignInForm = ({ handleExist, authUser, user }) => {
  //Validation with formik
  const formik = useFormik({
    initialValues: {
      email: user ? user.email : "",
      password: "",
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    }),

    onSubmit: (values) => {
      authUser(values);

      formik.resetForm();
    },
  });

  if (formik.errors.email || formik.errors.password) {
    errorAlert(formik.errors);
    formik.setErrors({});
  }

  return (
    <Form onSubmit={formik.handleSubmit}>
      <input
        id="email"
        type="text"
        placeholder="Enter your email"
        value={formik.values.email}
        onChange={formik.handleChange}
      />
      <input
        id="password"
        type="password"
        placeholder="Enter your password"
        value={formik.values.password}
        onChange={formik.handleChange}
      />

      <button type="submit">Sign in</button>

      <div className="lastBtns">
        <a onClick={() => handleExist(false)}>Sign Up</a>
        <Link href="/">
          <a onClick={() => handleExist(null)}>Cancel</a>
        </Link>
      </div>
    </Form>
  );
};

const SignUpForm = ({ handleExist, createUser, user }) => {
  //Validation with formik
  const formik = useFormik({
    initialValues: {
      name: "",
      email: user ? user.email : "",
      password: "",
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .min(2, "Name must be at least 2 characters"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    }),

    onSubmit: (values) => {
      createUser(values);

      formik.resetForm();
    },
  });

  if (formik.errors.name || formik.errors.email || formik.errors.password) {
    errorAlert(formik.errors);
    formik.setErrors({});
  }

  return (
    <Form onSubmit={formik.handleSubmit}>
      <input
        id="name"
        type="text"
        placeholder="Enter your name"
        value={formik.values.name}
        onChange={formik.handleChange}
      />
      <input
        id="email"
        type="text"
        placeholder="Enter your email"
        value={formik.values.email}
        onChange={formik.handleChange}
      />
      <input
        id="password"
        type="password"
        placeholder="Enter your password"
        value={formik.values.password}
        onChange={formik.handleChange}
      />

      <button type="submit">Sign up</button>

      <div className="lastBtns">
        <a onClick={() => handleExist(true)}>Sign In</a>
        <Link href="/">
          <a onClick={() => handleExist(null)}>Cancel</a>
        </Link>
      </div>
    </Form>
  );
};

export { EmailForm, SignInForm, SignUpForm };
