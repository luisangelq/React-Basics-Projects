const authReducer = (state, action) => {
  switch (action.type) {
    case "EXIST":
      return {
        ...state,
        user: action.payload.user,
        exist: action.payload.exist,
        msg: action.payload.msg,
      };
    case "CREATE_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case "AUTH_USER":
      localStorage.setItem("login", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        msg: action.payload.msg,
      };
    case "AUTH_TOKEN":
      localStorage.setItem(
        "login",
        JSON.stringify({
          user: action.payload.user,
          token: state.token,
          msg: state.msg,
        })
      );
      return {
        ...state,
        user: action.payload.user,
      };
    case "LOGOUT":
      localStorage.removeItem("login");
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        exist: null,
        msg: null,
      };

    default:
      return state;
  }
};

export default authReducer;
