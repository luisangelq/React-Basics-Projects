import { useContext, useState } from "react";
import { CategoryContext } from "../context/CategoryContext";
import { RecipesContext } from "../context/RecipesContext";

const Form = () => {
  const [search, saveSearch] = useState({
    name: "",
    category: "",
  });

  const { categories } = useContext(CategoryContext);
  const { saveSearchRecipe, saveConsult } = useContext(RecipesContext);

  const getDataRecipe = (e) => {
    saveSearch({
        ...search,
        [e.target.name] : e.target.value
    });
  };

  return (
    <form
      className="col-12"
       onSubmit={e => {
           e.preventDefault();
           saveSearchRecipe(search);
           saveConsult(true)
       }}
    >
      <fieldset className="text-center">
        <legend>Search drinks</legend>
      </fieldset>

      <div className="row mt-4">
        <div className="col-md-4">
          <input
            name="name"
            className="form-control"
            type="text"
            placeholder="Search by ingredient"
            
            onChange={getDataRecipe}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-control"
            name="category"
            onChange={getDataRecipe}
          >
            <option value="">-- Select Category --</option>
            {categories.map((category) => (
              <option key={category.strCategory} value={category.strCategory}>
                {category.strCategory}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <input
            className="btn btn-block btn-primary"
            type="submit"
            value="Search Drinks"
            style={{width: "100%"}}
          />
        </div>
      </div>
    </form>
  );
};

export default Form;
