import Swal from "sweetalert2";

export const successAlert = (msg) => {
  Swal.fire({
    icon: "success",
    title: msg,
    showConfirmButton: false,
    timer: 2000,
  });
};

export const errorAlert = (errors) => {
  const errorFilter = Object.values(errors)[0];
  console.log(errorFilter);

  //Login and Register form errors
  if (
    errors.general ||
    errors.name ||
    errors.email ||
    errors.password ||
    errors.confirmPassword
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: errorFilter,
      showConfirmButton: false,
      timer: 2000,
    });
    return;
  }

  //newProductForm errors
  if (
    errors.productName ||
    errors.company ||
    errors.url ||
    errors.description
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: errorFilter,
      showConfirmButton: false,
      timer: 2000,
    });
    return;
  }

  //Firebase Response Errors
  if (errors.emailExists || errors.userExists || errors.productExists) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: errorFilter,
      showConfirmButton: false,
      timer: 2000,
    });
    return;
  }
};
