import { useReducer, useContext } from "react";
import Router from "next/router";
import axiosClient from "../../config/axios";

import FilesContext from "./filesContext";
import filesReducer from "./filesReducer";

const FilesState = ({ children }) => {
  const initialState = {
    files: [],
    zipFiles: [],
    url: null,
    msg: null,
    loading: false,
  };

  
  const [state, dispatch] = useReducer(filesReducer, initialState);

  const setFileFn = async (file) => {
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

  const uploadZipFileFn = async (zipFile, fileParams) => {
    console.log(fileParams);
    try {
      const res = await axiosClient.post("/api/files", zipFile);
      console.log(res);

      dispatch({
        type: "UPLOAD_ZIP_FILE",
        payload: res.data,
      });

      const filesArray = state.files.map((file) => {
        return {
          fileId: file.fileId,
          name: file.name,
          size: file.size,
        }
      });
      const fileInfo = {
        name: res.data.file,
        content: filesArray,
        downloads: fileParams.downloads,
        expires: fileParams.expires,
        password: fileParams.password,
      };

      createLinkFn(fileInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const createLinkFn = async (fileInfo) => {
    console.log(fileInfo);

    try {
      const res = await axiosClient.post("/api/links", fileInfo);
      console.log(res);

      dispatch({
        type: "CREATE_LINK",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const loadingFn = (loading) => {
    dispatch({
      type: "LOADING",
      payload: loading,
    });
  };

  const cleanStateFn = () => {
    dispatch({
      type: "CLEAN_STATE",
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
        loadingFn,
        cleanStateFn
      }}
    >
      {children}
    </FilesContext.Provider>
  );
};

export default FilesState;
