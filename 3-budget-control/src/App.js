import { useState } from "react";
import InputBudget from "./components/InputBudget";
import Expenses from "./components/Expenses";

const App = () => {
  const [budget, setBudget] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [showForm, setShowForm] = useState(false);

  console.log(showForm);
  return (
    <div className="container">
      <h1>Weekly Spending</h1>

      <div className="main-content content">
        {showForm === false ? (
          <InputBudget
            setBudget={setBudget}
            setRemaining={setRemaining}
            setShowForm={setShowForm}
          />
        ) : (
          <Expenses />
        )}
      </div>
    </div>
  );
};

export default App;
