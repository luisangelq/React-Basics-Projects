import { Fragment } from "react";
import PropTypes from "prop-types";

const ShowExpenses = ({ expenses, deleteExpense }) => {

  
  return (
    <Fragment>
      <h2>Showin expenses</h2>

      <div className="gastos-realizados">
        {expenses.map((expense) => (
          <li key={expense.id} className="gastos">
            <p>
            <button className="btn-delete" onClick={() => deleteExpense(expense)} >X</button>
              {expense.name}

              <span className="gasto">$ {expense.amount}</span>
            </p>
            
          </li>
        ))}
      </div>
    </Fragment>
  );
};

ShowExpenses.propTypes = {
  expenses: PropTypes.array.isRequired,
  deleteExpense: PropTypes.func.isRequired,
}
export default ShowExpenses;
