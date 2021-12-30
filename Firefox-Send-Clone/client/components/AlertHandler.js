import Swal from "sweetalert2";
import Router from "next/router";

const successAlert = (data) => {
  const msg = Object.values(data)[0];

  Swal.fire({
    icon: "success",
    title: msg,
    showConfirmButton: false,
    timer: 2000,
  });
};

const errorAlert = (error) => {
  const msg = Object.values(error)[0];

  Swal.fire({
    icon: "error",
    title: msg,
    showConfirmButton: false,
    timer: 3000,
  });
};

const goToSignAlert = async (error, route) => {
  const msg = Object.values(error)[0];
  let res;

  await Swal.fire({
    title: msg,
    icon: "warning",
    confirmButtonColor: "#0060DF",
    confirmButtonText: `Go to ${route}`,
  }).then((result) => {
    if (result.isConfirmed) {
        if(route === "Sign In"){
            res = true;
        } else {
            res = false;
        }
    }
  });

  return res;
};

const goToSignUp = async (error, route) => {
  const msg = Object.values(error)[0];
  let res;

  await Swal.fire({
    title: msg,
    icon: "warning",
    confirmButtonColor: "#0060DF",
    confirmButtonText: `Go to ${route}`,
  }).then((result) => {
    if (result.isConfirmed) {
      console.log("hola");
        Router.push("/login");
    }
  });

  return res;
}

export { successAlert, errorAlert, goToSignAlert, goToSignUp };
