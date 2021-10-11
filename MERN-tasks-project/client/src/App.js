import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import MainPanel from "./components/layout/MainPanel";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/main-panel" component={MainPanel} />
      </Switch>
    </Router>
  );
};

export default App;
