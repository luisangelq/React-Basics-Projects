import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import MainPanel from "./components/layout/MainPanel";

import ProjectState from "./context/projects/ProjectState";
import TaskState from "./context/tasks/TaskState";
import AuthState from "./context/auth/AuthState";
import AccessControl from "./config/accessControl";

const App = () => {
  
  console.log(process.env.REACT_APP_BACKEND_URL);
  return (
    <AuthState>
      <ProjectState>
        <TaskState>
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/sign-up" component={SignUp} />
              <AccessControl exact path="/main-panel" component={MainPanel} />
            </Switch>
          </Router>
        </TaskState>
      </ProjectState>
    </AuthState>
  );
};

export default App;
