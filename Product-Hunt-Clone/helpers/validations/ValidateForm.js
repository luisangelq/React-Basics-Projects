const registerForm = (data) => {
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
  if (data.name.trim() === "") {
    errors.name = "Name is required";
  }

  //Email Validation with regex
  if (data.email.trim() === "") {
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

const loginForm = (data) => {
  let errors = {};

  if (data.email.trim() === "" && data.password.trim() === "") {
    errors.general = "All fields are required";
  }

  //Email Validation with regex
  if (data.email.trim() === "") {
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

  return errors;
};

const newProductForm = (data) => {

  console.log(data);
  let errors = {};

  if (
    data.productName.trim() === "" &&
    data.company.trim() === "" &&
    data.url.trim() === "" &&
    data.description.trim() === ""
  ) {
    errors.general = "All fields are required";
  }

  if (data.productName.trim() === "") {
    errors.productName = "Product Name is required";
  }

  if (data.company.trim() === "") {
    errors.company = "Company is required";
  }

  if (data.url.trim() === "") {
    errors.url = "Url is required";
  } else if (
    !data.url.match(
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
    )
  ) {
    errors.url = "Url is invalid";
  }

  if (data.description.trim() === "") {
    errors.description = "Description is required";
  }

  return errors;
};


export { registerForm, loginForm, newProductForm };
