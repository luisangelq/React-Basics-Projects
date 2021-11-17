//Each reducer has their own state state

const initialState = {
  products: [],
  error: null,
  loading: false,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case "ADD_PRODUCT_ERROR":
    case "GET_PRODUCTS_ERROR":
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
    default:
      return state;
  }
};

export default productsReducer;
