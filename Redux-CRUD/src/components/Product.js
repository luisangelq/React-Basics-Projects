import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { useDispatch } from "react-redux";
import { deleteProduct, selectProduct } from "../actions/productsAction";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editProduct = (product) => {
    console.log(product);
    dispatch(selectProduct(product));
    navigate(`/products/edit/${product.id}`);
  };

  const deleteProductAction = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(id));
      }
    });
  };

  return (
    <tr>
      <td>{product.name}</td>
      <td>
        <span className="font-weight-bold">$ {product.price}</span>{" "}
      </td>
      <td>
        <button
          type="button"
          className="btn btn-primary m-2"
          onClick={() => editProduct(product)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => deleteProductAction(product.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Product;
