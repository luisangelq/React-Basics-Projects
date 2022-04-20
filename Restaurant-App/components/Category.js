import { useRouter } from "next/router";
import Image from "next/image";
import useRestaurant from "../hooks/useRestaurant";

const Category = ({ category }) => {
  const { name, icon, id } = category;
  const { currentCategory, handleCategory } = useRestaurant();

  const router = useRouter();
  return (
    <button
      //back to home using the router
      onClick={() => {
        handleCategory(id);
        if (router.pathname !== "/") {
          router.push("/");
        }
      }}
      className={`${
        currentCategory?.id === id ? "bg-amber-400" : null
      } flex gap-4 p-4 border ease-in-out duration-300 hover:cursor-pointer hover:bg-amber-400`}
    >
      <Image
        width={70}
        height={70}
        src={`/assets/img/icon_${icon}.svg`}
        alt={name}
        className="mr-5"
      />
      <p className="text-2xl font-bold">{name}</p>
    </button>
  );
};

export default Category;
