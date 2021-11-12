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
  RESET_ALERT,
  LOGOUT,
} from "../../types/index";
import authToken from "../../config/authToken";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    user: JSON.parse(localStorage.getItem("user")),
    isAuthenticated: null,
    page: "",
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

      getLoggedUser();
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: ERROR_REGISTER,
        payload: error.response.data,
      });
    }
  };


  //Login User
  const loginUser = async (user) => {
    try {
      const res = await axiosClient.post("/api/auth", user);
      dispatch({
        type: SUCCESSFUL_LOGIN,
        payload: res.data,
      });

      getLoggedUser();
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: ERROR_LOGIN,
        payload: error.response.data,
      });
    }
  };

  
  //Return register user
  const getLoggedUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      authToken(token);
    }

    try {
      const res = await axiosClient.get("/api/auth");
      dispatch({
        type: GET_USER,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: ERROR_LOGIN,
        payload: error.response.data,
      });
    }
  };

  //Redirect to main panel
  const resetAlert = (page) => {
    dispatch({
      type: RESET_ALERT,
      payload: page,
    });
  };

  //Logout
  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        page: state.page,
        alert: state.alert,
        registerUser,
        loginUser,
        getLoggedUser,
        resetAlert,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
