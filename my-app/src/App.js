import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { createRenderer } from "fela";
import { Provider } from "react-fela";
import BackOffice from "./backOffice";

function Index() {
  return <h2>Home</h2>;
}
function Users() {
  return <h2>Users</h2>;
}

const renderer = createRenderer();

const App = () => {
  return (
    <Router>
      <Provider renderer={renderer}>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/backoffice/">BackOffice</Link>
              </li>
              <li>
                <Link to="/users/">Users</Link>
              </li>
            </ul>
          </nav>

          <Route path="/" exact component={Index} />
          <Route path="/backoffice/" component={BackOffice} />
          <Route path="/users/" component={Users} />
        </div>
      </Provider>
    </Router>
  );
};

export default App;
