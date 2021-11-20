import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Spinner from "./Spinner";
import Swal from "sweetalert2";

//Redux Action
import { createProduct } from "../actions/productsAction";

const NewProducts = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  //Redux Dispatch
  const dispatch = useDispatch();

  //Callback function to create new product
  const addProduct = (product) => dispatch(createProduct(product));

  //Redux State
  const error = useSelector((state) => state.products.error);
  const loading = useSelector((state) => state.products.loading);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    if (error === false) {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

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
    addProduct({
      name,
      price,
      id: Date.now(),
    });

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
            <h2 className="text-center mb-4 font-weight-bold">
              Add New Product
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Product Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>

              <div style={{ height: "4rem" }}>
                {loading ? <Spinner /> : null}
              </div>

              <button
                type="submit"
                className="btn btn-danger font-weight-bold text-uppercase d-block w-100"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProducts;
