const filesReducer = (state, action) => {
  switch (action.type) {
    case "SET_FILE":
      return {
        ...state,
        files: [...state.files, action.payload],
      };
    case "DELETE_FILE":
      return {
        ...state,
        files: state.files.filter((file) => file.fileId !== action.payload),
      };

    case "UPLOAD_ZIP_FILE":
      return {
        ...state,
        zipFiles: [
          ...state.zipFiles,

          {
            name: action.payload.file,
            content: state.files,
          },
        ],
        
        msg: action.payload.msg,
        loading: false,
      };
    case "LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    default:
      break;
  }
};

export default filesReducer;
