import { Fragment, useState } from "react";
import ShowExpenses from "./ShowExpenses";
import Result from "./Result";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const Expenses = ({budget, remaining, expenses, setShowForm, addExpense, deleteExpense }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  const calculateAmount = (e) => {
    e.preventDefault();

    //Validate Fields
    if (name.trim() === "" || amount <= 0 || isNaN(amount)) {
      Swal.fire({
        icon: "error",
        title: "Fields Are Required",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    //Create the object
    const newExpense = {
      id: new Date().getTime(),
      name ,
      amount: parseInt(amount),
    };

    // Add expense to the main state
    addExpense(newExpense);

    // Clear the form
    setName("");
    setAmount(0);

    console.log(newExpense);
  };
  return (
    <Fragment>
      <div className="row">
        <div className="one-half column">
          <form onSubmit={calculateAmount}>
            <h2>Add Your Expenses Here</h2>

            <div className="campo">
              <label htmlFor="expense">Expense Name</label>
              <input
                type="text"
                name="expense"
                placeholder="Sample Food"
                className="u-full-width"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="campo">
              <label htmlFor="expense">Expense Amount</label>
              <input
                type="number"
                name="amount"
                placeholder="Sample 300"
                className="u-full-width"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <input
              type="submit"
              className="button-primary u-full-width"
              value="Add Expense"
            />
          </form>
        </div>
        <div className="one-half column">
          <ShowExpenses expenses={expenses} deleteExpense={deleteExpense} />
          <Result budget={budget} remaining={remaining} />
        </div>
      </div>
      <input type="button" value="⇽ Back" onClick={() => setShowForm(false)} />
    </Fragment>
  );
};

Expenses.propTypes = {
  budget: PropTypes.number.isRequired,
  remaining: PropTypes.number.isRequired,
  expenses: PropTypes.array.isRequired,
  setShowForm: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  deleteExpense: PropTypes.func.isRequired,
}

export default Expenses;
