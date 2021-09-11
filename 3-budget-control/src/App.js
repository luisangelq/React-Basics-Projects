import { useState } from "react";
import InputBudget from "./components/InputBudget";
import Expenses from "./components/Expenses";

const App = () => {
  const [budget, setBudget] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
    setRemaining(remaining - expense.amount);
  };
  return (
    <div className="container">
      <h1>Weekly Spending</h1>

      <div className="main-content content">
        {showForm === false ? (
          <InputBudget
            setBudget={setBudget}
            setRemaining={setRemaining}
            setShowForm={setShowForm}
            budget={budget}
          />
        ) : (
          <Expenses
            setShowForm={setShowForm}
            addExpense={addExpense}
            expenses={expenses}
          />
        )}
      </div>
    </div>
  );
};

export default App;
