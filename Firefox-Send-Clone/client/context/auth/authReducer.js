const authReducer = (state, action) => {
  switch (action.type) {
    case "EXIST":
        return {
            ...state,
            user: action.payload.user,
            exist: action.payload.exist,
            msg: action.payload.msg
        };
    case "CREATE_USER":
        return {
            ...state,
            user: action.payload,
            isAuthenticated: true,
        };
    case "AUTH_USER":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        msg: action.payload.msg
      };
    

    default:
      return state;
  }
};

export default authReducer;
