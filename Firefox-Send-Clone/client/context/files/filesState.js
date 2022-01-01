import { useReducer, useContext } from "react";
import Router from "next/router";
import axiosClient from "../../config/axios";

import FilesContext from "./filesContext";
import filesReducer from "./filesReducer";

const FilesState = ({ children }) => {
  const initialState = {
    files: [],
    zipFiles: [],
    downloads: 1,
    password: null,
    url: null,
    msg: null,
    loading: false,
  };

  const [state, dispatch] = useReducer(filesReducer, initialState);

  const setFileFn = async (file) => {
    console.log(file);
    dispatch({
      type: "SET_FILE",
      payload: file,
    });
  };

  const deleteFileFn = async (fileId) => {
    console.log(fileId);

    dispatch({
      type: "DELETE_FILE",
      payload: fileId,
    });
  };

  const uploadZipFileFn = async (zipFile) => {
    try {
      const res = await axiosClient.post("/api/files", zipFile);
      console.log(res);

      dispatch({
        type: "UPLOAD_ZIP_FILE",
        payload: res.data,
      })
    
      const fileInfo = {
        name: res.data.file,
        content: state.files,
        password: state.password,
        downloads: state.downloads,
      }

      createLinkFn(fileInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const createLinkFn = async (fileInfo) => {
        console.log(fileInfo);
      
    try {

    //   const res = await axiosClient.post("/api/files/link", { fileInfo });
    //   console.log(res);

    //   dispatch({
    //     type: "CREATE_LINK",
    //     payload: res.data,
    //   });
    } catch (error) {
      console.log(error);
    }
  }

  const loadingFn = (loading) => {
    dispatch({
      type: "LOADING",
      payload: loading,
    });
  }

  return (
    <FilesContext.Provider
      value={{
        files: state.files,
        zipFiles: state.zipFiles,
        downloads: state.downloads,
        password: state.password,
        url: state.url,
        msg: state.msg,
        loading: state.loading,
        setFileFn,
        deleteFileFn,
        uploadZipFileFn,
        loadingFn
      }}
    >
      {children}
    </FilesContext.Provider>
  );
};

export default FilesState;
