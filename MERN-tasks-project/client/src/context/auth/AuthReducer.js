import {
  SUCCESSFUL_REGISTER,
  ERROR_REGISTER,
  GET_USER,
  SUCCESSFUL_LOGIN,
  ERROR_LOGIN,
  RESET_ALERT,
  LOGOUT,
} from "../../types/index";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case SUCCESSFUL_REGISTER:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        page: "signUp",
        alert: { msg: action.payload.msg, type: "success" },
      };

    case SUCCESSFUL_LOGIN:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        page: "login",
        alert: { msg: action.payload.msg, type: "success" },
      };

    case GET_USER:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case ERROR_REGISTER:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        page: "signUp",
        alert: { msg: action.payload.msg, type: "error" },
      };

    case ERROR_LOGIN:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        page: "login",
        alert: { msg: action.payload.msg, type: "error" },
      };

    case RESET_ALERT:
      return {
        ...state,
        page: action.payload,
        alert: null,
      };

    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: null,
        page: "login",
        alert: null,
      };

    default:
      return state;
  }
};

export default AuthReducer;
