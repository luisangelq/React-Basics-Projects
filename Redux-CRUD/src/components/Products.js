import { Fragment, useEffect } from "react";
import Spinner from "./Spinner";
import Product from "./Product";

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

    //get the state
    const products = useSelector(state => state.products.products);
    console.log(products);

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
                <tbody className="text-center">
                    {products.length !== 0 ? products.map(product => (
                        <Product 
                            key={product.id}
                            product={product}
                        />
                    )) : null}
                </tbody>
            </table>

            {products.length === 0 ? <Spinner /> : null}
        </Fragment>
          
    )
}

export default Products;