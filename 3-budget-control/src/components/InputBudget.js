import { Fragment, useState } from "react";
import Swal from 'sweetalert2';

const InputBudget = ({setBudget, setRemaining}) => {
  const [value, setValue] = useState(0);


  const addBudget = (e) => {
      e.preventDefault();
      console.log(value);
      //validate
      if(value <= 0 || isNaN(value) || value === ""){
        Swal.fire({
            title: 'Invalid Budget',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
          })
          return;
      }

      setBudget(value);
      setRemaining(value);
  }

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
    </Fragment>
  );
};

export default InputBudget;
