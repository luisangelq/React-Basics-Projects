//Each reducer has their own state state
import {
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR
} from "../types"

const initialState = {
    products: [],
    error: null,
    loading: false,
}

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return {
                ...state,
                loading: true,
                error: null
            }
        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                products: [...state.products, action.payload],
                loading: false,
            }
        case ADD_PRODUCT_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

export default productsReducer;