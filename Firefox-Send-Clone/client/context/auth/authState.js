import { useReducer } from "react";
import AuthContext from "./authContext";

const AuthState = ({ children }) => {


    return (
        <AuthContext.Provider
            value={{

            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthState;

