import Axios from "axios";
import { createContext, useState, useEffect } from "react";


export const RecipesContext = createContext();

const RecipesProvider = (props) => {

    const [recipes, saveRecipes] = useState([]);
    const [search, saveSearchRecipe] = useState({
        name: "",
        category: ""
    })

    const [consult, saveConsult] = useState(false)
    const {name, category} = search;

    useEffect(() => {
        if(consult){
            const consultApi = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}&c=${category}`
    
                const result = await Axios(url);
    
                saveRecipes(result.data.drinks);
            }
            consultApi();
        }
        
    }, [category, consult, name, search])

    return (
        <RecipesContext.Provider
            value={{
                recipes,
                saveSearchRecipe,
                saveConsult
                
            }}
        >
            {props.children}
        </RecipesContext.Provider>
    )
}

export default RecipesProvider;