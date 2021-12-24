import { useReducer } from "react";
import Router from "next/router";
import {
  successAlert,
  errorAlert,
  goToSignAlert,
} from "../../components/AlertHandler";
import axiosClient from "../../config/axios";

import AuthContext from "./authContext";
import authReducer from "./authReducer";

const AuthState = ({ children }) => {
  const initialState = {
    user: null,
    token: null,
    isAuthenticated: null,
    exist: null,
    msg: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const handleExist = async (exist = null, user = null, msg = null) => {
    console.log(exist, user, msg);
    dispatch({
      type: "EXIST",
      payload: {
        exist: exist,
        user: user,
        msg: msg,
      },
    });
  };

  const emailExist = async (email) => {
    try {
      const res = await axiosClient.post("/api/auth/email", email);

      if (res.data.exist) {
        handleExist(res.data.exist, email, res.data.msg);
      } else {
        handleExist(false, email, res.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createUser = async (user) => {
    try {
      const res = await axiosClient.post("/api/users", user);
      dispatch({
        type: "CREATE_USER",
        payload: user,
      });

      successAlert(res.data);
    } catch (error) {
      console.log(error);

      if (error.response.data.msg.includes("User already exists")) {
        const exist = await goToSignAlert(error.response.data, "Sign In");

        if (exist) {
          handleExist(exist);
        }
      } else {
        errorAlert(error.response.data);
      }
    }
  };

  const authUser = async (user) => {
    try {
      const res = await axiosClient.post("/api/auth", user);

      dispatch({
        type: "AUTH_USER",
        payload: {
            user: user,
            token: res.data.token,
            msg: res.data.msg
        }
      });
      successAlert(res.data);

      //Go to main page after sign up
      setTimeout(() => {
        Router.push("/");

        handleExist(null);
      }, 2000);
    } catch (error) {
      console.log(error.response.data);

      if (error.response.data.msg.includes("This User Doesn't Exist")) {
        const exist = await goToSignAlert(error.response.data, "Sign Up");

        if (!exist) {
          handleExist(exist);
        }
      } else {
        errorAlert(error.response.data);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        exist: state.exist,
        msg: state.msg,
        handleExist,
        emailExist,
        createUser,
        authUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
