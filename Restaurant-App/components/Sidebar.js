import Image from "next/image";
import useRestaurant from "../hooks/useRestaurant";

import Category from "./Category";

const Sidebar = () => {
  const { categories } = useRestaurant();
  return (
    <>
      <Image width={300} height={100} src="/assets/img/logo.svg" alt="logo" />

      <nav className="mt-10 flex flex-col">
        {categories.map((category) => (
          <Category
            key={category.id}
            category={category}
          />
        ))}
      </nav>
    </>
  );
};

export default Sidebar;
