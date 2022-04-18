import Layout from '../components/Layout'
import useRestaurant from '../hooks/useRestaurant'
import Product from '../components/Product'

export default function Home() {
  const { currentCategory, products } = useRestaurant()

  const productsByCategory = products.filter(product => {
    return product.categoryId === currentCategory
  })


  return (
    <>
      <Layout
        page={`${currentCategory?.name}`}
      >
        <h1 className='text-4xl font-black m-5'>
          {currentCategory?.name}
        </h1>


        <h2>Hola</h2>
        
          <Product 
            key={products.id}
            product={productsByCategory}
          />
      </Layout>
    </>
  )
}
