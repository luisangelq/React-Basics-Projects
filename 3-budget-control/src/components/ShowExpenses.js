import { Fragment } from "react";

const ShowExpenses = ({ expenses }) => {
  return (
    <Fragment>
      <h2>Showin expenses</h2>

      <div className="gastos-realizados">
        {expenses.map((expense) => (
          <li key={expense.id} className="gastos">
            <p>
              {expense.name}

              <span className="gasto">$ {expense.amount}</span>
            </p>
          </li>
        ))}
      </div>
    </Fragment>
  );
};

export default ShowExpenses;
