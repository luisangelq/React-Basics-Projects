import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
} from "../types";
import axiosClient from "../config/axiosClient";
import Swal from "sweetalert2";

export const createProduct = (product) => {
  return async (dispatch) => {
    dispatch({
      type: ADD_PRODUCT,
    });

    try {
      // Insertar en la API
      await axiosClient.post("/products", product);
      setTimeout(() => {
        dispatch({
          type: ADD_PRODUCT_SUCCESS,
          payload: product,
        });
      }, 1000);

      Swal.fire({
        icon: "success",
        title: "Product Added",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: ADD_PRODUCT_ERROR,
        payload: true,
      });
    }
  };
};

export const getProducts = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_PRODUCTS,
    })

    try {
      const res = await axiosClient.get("/products");
      console.log(res.data);
      setTimeout(() => {
        dispatch({
          type: GET_PRODUCTS_SUCCESS,
          payload: res.data,
        });
      }, 1000);

    }catch (error) {
      console.log(error.response);
      dispatch({
        type: GET_PRODUCTS_ERROR,
        payload: true,
      });
    }
  }
}
