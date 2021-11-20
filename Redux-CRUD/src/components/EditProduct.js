import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { updateProduct } from "../actions/productsAction";

const EditProduct = () => {
  const [productEdited, setProductEdited] = useState({
    name: "",
    price: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editProduct = useSelector((state) => state.products.editProduct);

  useEffect(() => {
    setProductEdited(editProduct);
  }, [editProduct]);

  if (!editProduct) {
    window.location.href = "/";
    return null;
  }

  const { name, price, id } = productEdited;

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validate
    if (name.trim() === "" || price <= 0 || price === "") {
      Swal.fire({
        icon: "error",
        title: "All Flieds Are Required",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    dispatch(updateProduct({ name, price, id }));

    //redirect to main page
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">Edit Product</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Product Name"
                  name="name"
                  value={name}
                  onChange={(e) =>
                    setProductEdited({ ...productEdited, name: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Product Price</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Product Price"
                  name="price"
                  value={price}
                  onChange={(e) =>
                    setProductEdited({
                      ...productEdited,
                      price: Number(e.target.value),
                    })
                  }
                />
              </div>

              <button
                type="submit"
                className="btn btn-danger font-weight-bold text-uppercase d-block w-100"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
