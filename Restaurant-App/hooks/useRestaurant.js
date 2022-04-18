import { useContext } from "react";
import RestaurantContext from "../context/RestaurantProvider";

const useRestaurant = () => {
  return useContext(RestaurantContext);
};

export default useRestaurant;
