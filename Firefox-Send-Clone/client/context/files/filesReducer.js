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
    case "FILE_PARAMS":
      return {
        ...state,
        ...action.payload,
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
    case "CREATE_LINK":
      return {
        ...state,
        url: action.payload.link.url,
        msg: action.payload.msg,
      };
    case "LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "CLEAN_STATE":
      return {
        ...state,
        files: [],
        zipFiles: [],
        url: null,
        expires: null,
        msg: null,
        loading: false,
      };

    default:
      break;
  }
};

export default filesReducer;
