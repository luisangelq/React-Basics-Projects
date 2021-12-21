import { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";

const AuthState = ({ children }) => {

    const initialState = {
        user : null,
        token: null,
        isAuthenticated: null,
        msg : null,
        

    };
    
    const [state, dispatch] = useReducer(authReducer, initialState);

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

