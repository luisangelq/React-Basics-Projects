import Layout from "../components/Layout";
import useRestaurant from "../hooks/useRestaurant";
import Product from "../components/Product";

export default function Home() {
  const { currentCategory } = useRestaurant();

  return (
    <>
      <Layout page={`${currentCategory?.name}`}>
        <h1 className="text-4xl font-black m-5">{currentCategory?.name}</h1>
        <p className="text-2xl my-7">Choose and perzonalize your order</p>

        <div className="grid gap-4 grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 items-center justify-center">
          {currentCategory?.products?.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </Layout>
    </>
  );
}
