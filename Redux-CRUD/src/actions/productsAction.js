import axiosClient from "../config/axiosClient";
import Swal from "sweetalert2";

export const createProduct = (product) => {
  return async (dispatch) => {
    dispatch({
      type: "ADD_PRODUCT",
    });

    try {
      // Insertar en la API
      await axiosClient.post("/products", product);
      dispatch({
        type: "ADD_PRODUCT_SUCCESS",
        payload: product,
      });

      Swal.fire({
        icon: "success",
        title: "Product Added",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: "ADD_PRODUCT_ERROR",
        payload: true,
      });
    }
  };
};

export const getProducts = () => {
  return async (dispatch) => {
    dispatch({
      type: "GET_PRODUCTS",
    });

    try {
      const res = await axiosClient.get("/products");

      dispatch({
        type: "GET_PRODUCTS_SUCCESS",
        payload: res.data,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: "GET_PRODUCTS_ERROR",
        payload: true,
      });
    }
  };
};

//Update Product
export const selectProduct = (product) => {
  return async (dispatch) => {
    dispatch({
      type: "SELECT_PRODUCT",
      payload: product,
    });
  };
};

export const updateProduct = (product) => {
  console.log(product);
  return async (dispatch) => {
    dispatch({
      type: "UPDATE_PRODUCT",
    });

    try {
      // Insertar en la API
      await axiosClient.put(`/products/${product.id}`, product);
      dispatch({
        type: "UPDATE_PRODUCT_SUCCESS",
        payload: product,
      });

      Swal.fire({
        icon: "success",
        title: "Product Updated",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: "UPDATE_PRODUCT_ERROR",
        payload: true,
      });
    }
  };
};

//Delete Product
export const deleteProduct = (id) => {
  return async (dispatch) => {
    dispatch({
      type: "DELETE_PRODUCT",
    });

    try {
      setTimeout(async () => {
        await axiosClient.delete(`/products/${id}`);
        dispatch({
          type: "DELETE_PRODUCT_SUCCESS",
          payload: id,
        });

        Swal.fire({
          icon: "success",
          title: "Your product has been deleted",
          showConfirmButton: false,
          timer: 1500,
        });
      }, 1000);
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: "DELETE_PRODUCT_ERROR",
        payload: true,
      });
    }
  };
};
