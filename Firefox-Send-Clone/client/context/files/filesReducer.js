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
    case "GET_LINKS":
      return {
        ...state,
        //get just links with downloads
        links: action.payload.links.filter((link) => link.downloads > 0),
      };
    case "LOADING":
      return {
        ...state,
        loading: action.payload,
      };
      case "DELETE_LINK":
      return {
        ...state,
        links: state.links.filter((link) => link.url !== action.payload),
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

    case "LOGOUT":
      return {
        ...state,
        files: [],
        zipFiles: [],
        links: [],
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
