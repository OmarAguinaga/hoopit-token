import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';

const API_URL = 'http://localhost:3000';

export function signinUser({ username, password }) {
  return function(dispatch) {
    // Submit username/password to the server
    axios
      .post(`${API_URL}/signin`, { username, password })
      .then(response => {
        // If request is good...
        // - Update state o indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT token to local storage
        localStorage.setItem('token', response.data.token);
        // - Redirect to the route '/feature'
        browserHistory.push('/feature');
      })
      .catch(() => {
        // If request is bad...
        // -Show an error to the user
        dispatch(authError('Bad login info'));
      });
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}
