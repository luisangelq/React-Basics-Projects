import { useContext, useState } from "react";
import { ModalContext } from "../context/ModalContext";

import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: "#E4DBC8",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: "scroll",
    maxHeight: "80%"
    
    
  },
  header: {
    padding: "12px 0",
    borderBottom: "1px solid darkgrey",
  },
  content: {
    padding: "12px 0",
    overflow: "scroll",
  },
}));

const Recipe = ({ recipe }) => {
  //config modal
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { details, saveIdRecipe, saveDetails } = useContext(ModalContext);

  const showIngredients = details => {
      let ingredients = [];
      for(let i = 1; i < 16; i++){
        if(details[`strIngredient${i}`]) {
            ingredients.push(
                <li>{ details[`strIngredient${i}`]} - { details[`strMeasure${i}`]}</li>
            )
        }
      }

      return ingredients;
  }

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <h2 className="card-header">{recipe.strDrink}</h2>

        <img
          className="card-image-top"
          src={recipe.strDrinkThumb}
          alt="Drink Img"
        />

        <div className="card-body">
          <button
            type="button"
            className="btn btn-block btn-primary"
            style={{ width: "100%" }}
            onClick={() => {
              saveIdRecipe(recipe.idDrink);
              handleOpen();
            }}
          >
            Show Recipe
          </button>
          <Modal
            open={open}
            onClose={() => {
              saveIdRecipe(null);
              saveDetails({});
              handleClose();
            }}
          >
            <div style={modalStyle} className={classes.paper}>
              <h2>{details.strDrink}</h2>
              <h3 className="mt-4">How to Make It</h3>
              <p>{details.strInstructions}</p>
              <img
                className="img-fluid my-4"
                src={details.strDrinkThumb}
                alt="img drink"
              />

              <h3>Ingredients</h3>
              <ul>
                  {showIngredients(details)}
              </ul>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
