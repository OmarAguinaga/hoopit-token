import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';
import history from '../history';
import { AUTH_JOBS_KEY } from '../../config';

const API_URL = 'http://localhost:3000';

export function signinUser({ username, password }) {
  return function(dispatch) {
    // Submit username/password to the server
    axios
      .post(`${API_URL}/signin`, { username, password })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT token
        localStorage.setItem('token', response.data.token);
        // - redirect to the route '/feature'
        //history.push('/feature');
      })
      .catch(() => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Bad Login Info'));
      });
  };
}
export function signupUser({ username, email, password }) {
  return function(dispatch) {
    axios
      .post(`${API_URL}/signup`, { username, email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        history.push('/feature');
      })
      .catch(response => dispatch(authError('there was an error')));
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

// export function fetchMessage() {
//   return function(dispatch) {
//     axios
//       .get(API_URL, {
//         headers: { authorization: localStorage.getItem('token') }
//       })
//       .then(response => {
//         dispatch({
//           type: FETCH_MESSAGE,
//           payload: response.data.message
//         });
//       });
//   };
// }

export function fetchMessage() {
  return function(dispatch) {
    axios
      .get(`${API_URL}/jobs`, {
        headers: { authorization: localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.listings.listing
        });
      });
  };
}
