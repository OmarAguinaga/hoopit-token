import React, { Component } from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';

import Header from './header';
import Home from './home';
import Signin from './auth/signin';
import Signout from './auth/signout';
import Signup from './auth/signup';
import Feature from './feature';
import RequireAuth from './auth/require_auth';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header history={this.props.history} />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signin" component={Signin} />
          <Route path="/signout" component={Signout} />
          <Route path="/signup" component={Signup} />
          <Route path="/feature" component={RequireAuth(Feature)} />
        </Switch>
      </div>
    );
  }
}
