import { Fragment, useState } from "react";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const InputBudget = ({ budget, setBudget, setRemaining, setShowForm, setExpenses }) => {
  const [value, setValue] = useState(0);

  const addBudget = (e) => {
    e.preventDefault();
    console.log(value);
    //validate
    if (value <= 0 || isNaN(value)) {
      Swal.fire({
        title: "Invalid Budget",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    setBudget(value);
    setRemaining(value);
    setShowForm(true);
    setExpenses([]);
  };

  return (
    <Fragment>
      <h2>Set You Budget</h2>

      <form onSubmit={addBudget}>
        <input
          type="number"
          placeholder="Enter Your Budget"
          className="u-full-width"
          onChange={(e) => setValue(parseInt(e.target.value))}
        />

        <input
          type="submit"
          value="Set Budget"
          className="button-primary u-full-width"
        />
      </form>
      {budget ? (
        <div className="btn-input-budget">
          <input
            type="button"
            value="Continue ⇾"
            onClick={() => setShowForm(true)}
          />
        </div>
      ) : null}
    </Fragment>
  );
};

InputBudget.propTypes = {
  budget: PropTypes.number.isRequired,
  setBudget: PropTypes.func.isRequired,
  setRemaining: PropTypes.func.isRequired,
  setShowForm: PropTypes.func.isRequired,
  setExpenses: PropTypes.func.isRequired,

}

export default InputBudget;
