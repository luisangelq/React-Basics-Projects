import Swal from "sweetalert2";

const ErrorHandler = (errors) => {
  console.log(errors);

  if (errors.general) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: errors.general,
      showConfirmButton: false,
      timer: 2000,
    });
    return;
  }

  if (errors.name) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: errors.name,
      showConfirmButton: false,
      timer: 2000,
    });
    return;
  }
  if (errors.email) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: errors.email,
      showConfirmButton: false,
      timer: 2000,
    });
    return;
  }
  if (errors.password) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: errors.password,
      showConfirmButton: false,
      timer: 2000,
    });
    return;
  }
  if (errors.confirmPassword) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: errors.confirmPassword,
      showConfirmButton: false,
      timer: 2000,
    });
    return;
  }

  
  //Firebase Response Errors
  if (errors.emailExists) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: errors.emailExists,
      showConfirmButton: false,
      timer: 2000,
    });
    return;
  }
};

export default ErrorHandler;
