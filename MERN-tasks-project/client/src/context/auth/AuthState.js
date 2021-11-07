import { useReducer } from "react";
import axiosClient from "../../config/axios";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";

import {
  SUCCESSFUL_REGISTER,
  ERROR_REGISTER,
  GET_USER,
  SUCCESSFUL_LOGIN,
  ERROR_LOGIN,
  LOGOUT,
} from "../../types/index";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token") || null,
    userName: null,
    isAuthenticated: null,
    alert: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Register User
  const registerUser = async (user) => {
    try {
      const res = await axiosClient.post("/api/users", user);
      console.log(res.data);
      dispatch({
        type: SUCCESSFUL_REGISTER,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: ERROR_REGISTER,
        payload: error.response.data,
      });
    }
  };

  return (
    <AuthContext.Provider value={{
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        alert: state.alert,
        registerUser,

    }}>{props.children}</AuthContext.Provider>
  );
};

export default AuthState;
