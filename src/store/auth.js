import request from '../utils/request';
import produce from 'immer';
import { ActionType } from 'redux-promise-middleware';
import delay from 'p-min-delay';

export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';
export const LOGOUT = 'LOGOUT';

export const register = (email, password) => dispatch =>
  dispatch({
    type: REGISTER,
    payload: delay(
      request.post('/authentication/register', { email, password }),
      1500
    )
  }).then(data => {
    localStorage.setItem('token', data.token);
    return data;
  });

export const login = (email, password) => dispatch =>
  dispatch({
    type: LOGIN,
    payload: delay(
      request.post('/authentication/login', { email, password }),
      1500
    )
  }).then(data => {
    localStorage.setItem('token', data.token);
    return data;
  });

export const logout = () => dispatch => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT });
};

const initialState = {
  loggedin: true
};

export default produce((draft, action) => {
  switch (action.type) {
    case `${REGISTER}_${ActionType.Fulfilled}`:
      draft.loggedin = true;
      return;
    case `${LOGIN}_${ActionType.Fulfilled}`:
      draft.loggedin = true;
      return;
    case LOGOUT:
      draft.loggedin = false;
      return;
    default:
      return;
  }
}, initialState);
