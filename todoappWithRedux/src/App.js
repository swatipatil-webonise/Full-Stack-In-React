import React from 'react';
import Todo from './Todo';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login } from './Login';
import Register from './Register';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/view" component={Todo} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
