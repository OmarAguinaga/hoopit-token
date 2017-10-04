import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Header from './header';
import Home from './home';
import Signin from './auth/signin';
import Signout from './auth/signout';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signin" component={Signin} />
          <Route path="/signout" component={Signout} />
        </Switch>
      </div>
    );
  }
}
