import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit({ username, password }) {
    // Need to do something to log user in
    this.props.signinUser({ username, password });
  }

  renderField(field) {
    return (
      <div className="form-group">
        <label>{field.label}:</label>
        <input
          className="form-control"
          type={field.type ? field.type : 'text'}
          {...field.input}
        />
      </div>
    );
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { username, password } } = this.props;
    return (
      <form
        className="col-md-4"
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
      >
        <Field label="Username" name="username" component={this.renderField} />
        <Field
          label="Password"
          name="password"
          type="password"
          component={this.renderField}
        />
        {this.renderAlert()}
        <button action="submit" className="btn btn-dark">
          Sign in
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Signin = reduxForm({
  form: 'sigin',
  fields: ['username', 'password']
})(Signin);
export default connect(mapStateToProps, actions)(Signin);
