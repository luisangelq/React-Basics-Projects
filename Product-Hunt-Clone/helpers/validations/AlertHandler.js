import Swal from "sweetalert2";
import Router from "next/router";

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
    errors.quote ||
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

export const loginAlert = () => {
  Swal.fire({
    title: "Sign up on Product Hunt",
    imageUrl:
      "https://ph-static.imgix.net/category-tech/kitty.png?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=100&h=92&fit=max&dpr=1 1x, https://ph-static.imgix.net/category-tech/kitty.png?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=100&h=92&fit=max&dpr=2 2x, https://ph-static.imgix.net/category-tech/kitty.png?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=100&h=92&fit=max&dpr=3 3x",
    imageAlt: "kitty",
    text: "Join our community of friendly folks discovering and sharing the latest products in tech.",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Login",
    denyButtonText: `Register`,
    confirmButtonColor: "#4b587c",
    denyButtonColor: "#DA552F",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Router.push("/login");
    } else if (result.isDenied) {
      Router.push("/register");
    }
  });
}


