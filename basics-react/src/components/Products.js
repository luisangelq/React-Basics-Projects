import {Fragment} from 'react' 

const Products = ({product, cart, setCart}) => {

    const {title, price} = product;

    const addToCart = () => {
        setCart([...cart, product]);
    }
    return(
        <Fragment>
            <h2>{title}</h2>
            <p>{price}</p>
            <button
                type="button"
                onClick={addToCart}
            >Buy</button>
        </Fragment>
    )
}

export default Products;