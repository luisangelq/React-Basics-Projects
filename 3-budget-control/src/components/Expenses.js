import { Fragment } from "react";

const Form = () => {
  return (
    <Fragment>
      <div className="row">
        <div className="one-half column">
          <form>
            <h2>Add Your Expenses Here</h2>

            <div className="campo">
              <label htmlFor="expense">Expense Name</label>
              <input
                type="text"
                name="name"
                placeholder="Sample Food"
                className="u-full-width"
              />
            </div>

            <div className="campo">
              <label htmlFor="expense">Expense Amount</label>
              <input
                type="number"
                name="amount"
                placeholder="Sample 300"
                className="u-full-width"
              />
            </div>

            <input
              type="submit"
              className="button-primary u-full-width"
              value="Add Expense"
            />
          </form>
        </div>
        <div className="one-half column">2</div>
      </div>
      <button>⇽ Back</button>
    </Fragment>
  );
};

export default Form;
