import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    console.log(email, password);
    // Need to do something to log user in
  }

  render() {
    const { handleSubmit, fields: { username, password } } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Username:</label>
          <input {...username} className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input {...password} className="form-control" />
        </fieldset>
        <button action="submit" className="btn btn-dark">
          Sign in
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'signin',
  fields: ['username', 'password']
})(Signin);
