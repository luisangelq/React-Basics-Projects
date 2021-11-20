//Each reducer has their own state state

const initialState = {
  products: [],
  error: null,
  loading: false,
  editProduct: null,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_PRODUCT":
    case "UPDATE_PRODUCT":
    case "GET_PRODUCTS":
    case "ADD_PRODUCT":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "ADD_PRODUCT_SUCCESS":
      return {
        ...state,
        products: [...state.products, action.payload],
        loading: false,
      };
    case "DELETE_PRODUCT_ERROR":
    case "ADD_PRODUCT_ERROR":
    case "GET_PRODUCTS_ERROR":
    case "UPDATE_PRODUCT_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "GET_PRODUCTS_SUCCESS":
      return {
        ...state,
        products: action.payload,
        loading: false,
      };

    case "SELECT_PRODUCT":
      return {
        ...state,
        editProduct: action.payload,
        error: null,
      };

    case "UPDATE_PRODUCT_SUCCESS":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? (product = action.payload)
            : product
        ),
        loading: false,
      };

    case "DELETE_PRODUCT_SUCCESS":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
        loading: false,
      };
    default:
      return state;
  }
};

export default productsReducer;
