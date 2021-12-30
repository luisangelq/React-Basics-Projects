import { useReducer } from "react";
import Router from "next/router";

import FilesContext from "./filesContext";
import filesReducer from "./filesReducer";

const FilesState = ({ children }) => {


    return (
        <FilesContext.Provider
            value={{
                
            }}
        >
            {children}
        </FilesContext.Provider>
    )
}

export default FilesState;