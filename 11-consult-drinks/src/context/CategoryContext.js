import Axios from "axios";
import { createContext, useState, useEffect } from "react"

//create context
export const CategoryContext = createContext();

//Provides where you can find functions and state
const CategoryProvider = (props) => {

    const [categories, saveCategories] = useState([]);

    useEffect(() => {
        const consultApi = async () => {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`

            const result = await Axios(url);

            saveCategories(result.data.drinks);
        }
        consultApi()

    }, [])

    return (
        <CategoryContext.Provider
            value={{
                categories
            }}
        >
            {props.children}
        </CategoryContext.Provider>
    )
}

export default CategoryProvider;
    