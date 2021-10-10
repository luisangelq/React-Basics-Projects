import { useContext } from "react";
import { RecipesContext } from "../context/RecipesContext";
import Recipe from "../components/Recipe";

const RecipesList = () => {

    const { recipes } = useContext(RecipesContext);

    console.log(recipes);
    return(
        <div className="row mt-5">
            {recipes.map(recipe => (
                <Recipe 
                    key={recipe.idDrink}
                    recipe={recipe}
                />
            ))}
        </div>
    )
}

export default RecipesList; 