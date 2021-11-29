import { useEffect, useState } from "react";

import { getAuth } from "firebase/auth";
import {firebaseApp} from "../firebase";

const useAuth = () => {
  const [userLogged, setUserLogged] = useState(null);

  useEffect(() => {
    firebaseApp
    const auth = getAuth();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserLogged(user);
      } else {
        setUserLogged(null);
      }
    });

    return () => unsubscribe;
  }, []);

  return userLogged;
};

export default useAuth;
