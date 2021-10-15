import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import MainPanel from "./components/layout/MainPanel";

import ProjectState from "./context/projects/ProjectState";

const App = () => {
  return (
    <ProjectState>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/main-panel" component={MainPanel} />
        </Switch>
      </Router>
    </ProjectState>
  );
};

export default App;
