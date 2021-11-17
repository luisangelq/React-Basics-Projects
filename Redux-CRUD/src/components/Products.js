import { Fragment, useEffect } from "react";

// Redux
import { useDispatch, useSelector } from 'react-redux';
//Redux Action
import { getProducts } from "../actions/productsAction";


const Products = () => {

    const dispatch = useDispatch();
    
    useEffect(() => {
        const loadProducts = () => dispatch(getProducts());

        loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [])

    return(
        <Fragment>
            <h2 className="text-center my-5">Product List</h2>

            <table className="table table-stripped">
                <thead className="text-center bg-primary table-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </Fragment>
          
    )
}

export default Products;