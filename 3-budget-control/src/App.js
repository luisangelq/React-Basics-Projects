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

  //delete expense
  const deleteExpense = (expenseDelete) => {
    console.log(expenseDelete);
    const newExpenses = expenses.filter(expense => expense.id !== expenseDelete.id);
    setExpenses(newExpenses);

    setRemaining(remaining + expenseDelete.amount);
    

  }
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
            setExpenses={setExpenses}
          />
        ) : (
          <Expenses
            setShowForm={setShowForm}
            addExpense={addExpense}
            expenses={expenses}
            setExpenses={setExpenses}
            budget={budget}
            remaining={remaining}
            deleteExpense={deleteExpense}
          />
        )}
      </div>
    </div>
  );
};

export default App;
