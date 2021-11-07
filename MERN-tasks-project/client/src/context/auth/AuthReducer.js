import {
  SUCCESSFUL_REGISTER,
  ERROR_REGISTER,
  GET_USER,
  SUCCESSFUL_LOGIN,
  ERROR_LOGIN,
  LOGOUT,
} from "../../types/index";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case SUCCESSFUL_REGISTER:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        userName: action.payload.userName,
        isAuthenticated: true,
        alert: {msg: action.payload.msg, type: "success"},
      };
      break;

    case ERROR_REGISTER:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        alert: {msg: action.payload.msg, type: "error"},
      };
      break;

    default:
      break;
  }
};

export default AuthReducer;
