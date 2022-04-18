import Image from "next/image";

const Product = ({ product }) => {
  const { name, price, image } = product;

  console.log(product);

  return (
    <div className="border p-3">
        <h3>heheh</h3>
      <Image
        src={`/assets/img/cafe_01.jpg`}
        width={200}
        height={500}
        alt="dish image"
      />
    </div>
  );
};

export default Product;
