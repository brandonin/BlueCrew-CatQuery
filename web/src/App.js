import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Cats from "./Cats";
import Login from "./Login";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/cats" component={Cats} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Login} />
        </Switch>
      </div>
    )
  }
}

export default App;
