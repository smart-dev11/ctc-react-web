import { combineReducers } from 'redux';
import auth from './auth';
import loading from './loading';
import error from './error';
import positions from './positions';

export default combineReducers({ auth, positions, loading, error });
