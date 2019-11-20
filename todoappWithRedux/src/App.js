import React from 'react';
import Todo from './Todo';
import { BrowserRouter as Router, Route, Switch ,IndexRedirect } from 'react-router-dom';
import { Login } from './Login';
import Register from './Register';
import WrongRequest from './WrongRequest';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/view" component={Todo} />
        <Route path="/register" component={Register} />   
        <Route path="/" component={WrongRequest} />
      </Switch>
    </Router>
  );
}

export default App;
