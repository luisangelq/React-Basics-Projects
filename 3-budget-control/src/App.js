import { useState } from "react";
import InputBudget from "./components/InputBudget";

const App = () => {
  const [budget, setBudget] = useState(0);
  const [remaining, setRemaining] = useState(0);

  return (
    <div className="container">
      <h1>Weekly Spending</h1>

      <div className="main-content content">
        <InputBudget setBudget={setBudget} setRemaining={setRemaining} />
      </div>
    </div>
  );
};

export default App;
