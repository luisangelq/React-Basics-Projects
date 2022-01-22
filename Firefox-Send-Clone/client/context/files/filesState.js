import { useReducer, useContext } from "react";
import Router from "next/router";
import axiosClient from "../../config/axios";

import FilesContext from "./filesContext";
import filesReducer from "./filesReducer";

import AuthContext from "../auth/authContext";

const FilesState = ({ children }) => {
  const initialState = {
    files: [],
    zipFiles: [],
    links: [],
    url: null,
    msg: null,
    loading: false,
  };

  const [state, dispatch] = useReducer(filesReducer, initialState);

  const { user } = useContext(AuthContext);

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
    console.log(user);
    try {
      const res = await axiosClient.post("/api/files", zipFile);

      dispatch({
        type: "UPLOAD_ZIP_FILE",
        payload: res.data,
      });

      const filesArray = state.files.map((file) => {
        return {
          fileId: file.fileId,
          name: file.name,
          size: file.size,
        };
      });

      const fileInfo = {
        name: res.data.file,
        content: filesArray,
        downloads: fileParams.downloads,
        expires: new Date(Date.now() + fileParams.expires * 1000),
        password: fileParams.password,
        size: fileParams.totalSize,
        author: user === null ? null : user.userId,
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
      console.log(res.data);

      dispatch({
        type: "CREATE_LINK",
        payload: res.data,
      });

      await getUserLinksFn(user);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getUserLinksFn = async () => {
    try {
      //filter links by user
      if (user) {
        const res = await axiosClient.post("/api/links/userLinks", {
          userId: user.userId,
        });
        console.log(res.data);

        dispatch({
          type: "GET_LINKS",
          payload: res.data,
        });
      }
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

  const deleteLinkFn = async (linkUrl) => {
    console.log(linkUrl);
    try {
      dispatch({
        type: "DELETE_LINK",
        payload: linkUrl,
      });
      await axiosClient.delete(`/api/links/${linkUrl}`);
    } catch (error) {
      console.log(error);
    }
  };
  const cleanStateFn = () => {
    dispatch({
      type: "CLEAN_STATE",
    });
  };

  const logoutFilesFn = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <FilesContext.Provider
      value={{
        files: state.files,
        zipFiles: state.zipFiles,
        links: state.links,
        url: state.url,
        msg: state.msg,
        loading: state.loading,
        setFileFn,
        deleteFileFn,
        uploadZipFileFn,
        getUserLinksFn,
        loadingFn,
        deleteLinkFn,
        cleanStateFn,
        logoutFilesFn,
      }}
    >
      {children}
    </FilesContext.Provider>
  );
};

export default FilesState;
