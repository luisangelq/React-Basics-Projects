import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <tr>
      <td>{product.name}</td>
      <td>
        <span className="font-weight-bold">$ {product.price}</span>{" "}
      </td>
      <td>
        <Link to={`/product/${product.id}`} className="btn btn-primary m-2">
          Edit
        </Link>
        <button type="button" className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Product;
