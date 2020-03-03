import request from '../utils/request';
import produce from 'immer';

const LOGIN = 'auth/LOGIN';
const REGISTER = 'auth/REGISTER';

export const register = (email, password) => dispatch =>
  dispatch({
    type: REGISTER,
    payload: request.post('/authentication/register', { email, password })
  }).then(data => {
    localStorage.setItem('token', data.token);
    return data;
  });

export const login = (email, password) => dispatch =>
  dispatch({
    type: LOGIN,
    payload: request.post('/authentication/login', { email, password })
  }).then(data => {
    localStorage.setItem('token', data.token);
    return data;
  });
