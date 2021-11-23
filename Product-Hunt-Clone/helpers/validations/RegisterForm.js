const RegisterForm = (data) => {
  let errors = {};

  if (
    data.name.trim() === "" &&
    data.email.trim() === "" &&
    data.password.trim() === "" &&
    data.confirmPassword.trim() === ""
  ) {
    errors.general = "All fields are required";
  }

  //Name Validation
  if (!data.name) {
    errors.name = "Name is required";
  }

  //Email Validation with regex
  if (!data.email) {
    errors.email = "Email is required";
  } else if (
    !data.email.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    )
  ) {
    errors.email = "Email is invalid";
  }

  //Password Validation
  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  //Confirm Password Validation
  if (!data.confirmPassword) {
    errors.confirmPassword = "Confirm Password is required";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Password must match";
  }

  return errors;
};

export default RegisterForm;
