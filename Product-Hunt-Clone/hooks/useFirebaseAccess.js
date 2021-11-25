import { errorAlert, successAlert } from "../helpers/validations/AlertHandler";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import app from "../firebase";

const useFirebaseAccess = () => {
  app();

  //Register User on Firebase
  const registerRequest = async (name, email, password) => {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);

    //Update the user name profile
    await updateProfile(auth.currentUser, {
      displayName: name,
    });

    successAlert("User Created Successfully");
  };

  const registerErrorRequest = (error) => {
    const emailExist = error.includes("email-already-in-use");
    if (emailExist) {
      errorAlert({ emailExists: "This Email Already Exist" });
    }
  };

  const loginRequest = async (email, password) => {
    const auth = getAuth();
    const userAuth = await signInWithEmailAndPassword(auth, email, password);
    console.log(userAuth);
    successAlert("User Logged In Successfully");
  };

  const loginErrorRequest = (error) => {
    const userExist = error.includes("user-not-found");
    if (userExist) {
      errorAlert({ userExists: "This User Does Not Exist, Create An Account" });
    }
  };

  return {
    registerRequest,
    registerErrorRequest,
    loginRequest,
    loginErrorRequest,
  };
};

export default useFirebaseAccess;
