import styled from "styled-components";
import Link from "next/link";
import { useFormik } from "formik";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 0 solid #dae1e7;
  margin-left: 1.5rem;

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

  a {
    color: #0060df;
    font-weight: bold;
    margin-top: 1rem;
  }
`;

const EmailForm = () => {
  //Validation with formik
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
        console.log(values);
    }
  });

  return (
    <Form
        onSubmit={formik.handleSubmit}
    >
      <input
        id="email"
        type="email"
        placeholder="Enter your email"
        value={formik.values.email}
        onChange={formik.handleChange}
      />

      <button type="submit">Sign in/up</button>

      <Link href="/">
        <a>Cancel</a>
      </Link>
    </Form>
  );
};

const SignInForm = () => {
  return (
    <Form>
      <input id="email" type="email" placeholder="Enter your email" />
      <input id="password" type="password" placeholder="Enter your password" />

      <button type="submit">Sign in</button>

      <Link href="/">
        <a>Cancel</a>
      </Link>
    </Form>
  );
};

const SignUpForm = () => {
  return (
    <Form>
      <input id="name" type="text" placeholder="Enter your name" />
      <input id="email" type="email" placeholder="Enter your email" />
      <input id="password" type="password" placeholder="Enter your password" />

      <button type="submit">Sign up</button>

      <Link href="/">
        <a>Cancel</a>
      </Link>
    </Form>
  );
};

export { EmailForm, SignInForm, SignUpForm };
