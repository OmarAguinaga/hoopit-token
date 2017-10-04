import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

class Header extends Component {
  renderlinks() {
    if (this.props.authenticated) {
      // Show link to sign out
      return (
        <li className="nav-item">
          <Link to="/signout" className="nav-link text-secondary">
            Sign Out
          </Link>
        </li>
      );
    } else {
      // Show link to sign in or sign up
      return [
        <li className="nav-item" key={1}>
          <Link to="/signin" className="nav-link text-secondary">
            Sign in
          </Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link to="/signup" className="nav-link text-info">
            Sign up
          </Link>
        </li>
      ];
    }
  }

  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          Hopit
        </Link>
        <ul className="nav">{this.renderlinks()}</ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);
