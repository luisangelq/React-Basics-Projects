import { useEffect, useState } from "react";

import {
    getAuth
  } from "firebase/auth";
import app from "../firebase";

const useAuth = () => {
  const [user2, setUser2] = useState(null);

  useEffect(() => {
    app()
    const auth = getAuth();

    const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
            setUser2(user);
          } else {
            setUser2(null);
          }
    });

    return () => unsubscribe;
  }, []);

  return user2;
};

export default useAuth;
