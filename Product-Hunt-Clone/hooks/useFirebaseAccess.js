import ErrorHandler from "../helpers/validations/ErrorHandler";

import {
    getAuth,
    createUserWithEmailAndPassword,
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
  };

  const registerErrorRequest = (error) => {
    const emailExist = error.includes("email-already-in-use");
    if (emailExist) {
      ErrorHandler({emailExists: "This Email Already Exist"});
    }    
    
  };

  return {
    registerRequest,
    registerErrorRequest,
  };
};

export default useFirebaseAccess;
