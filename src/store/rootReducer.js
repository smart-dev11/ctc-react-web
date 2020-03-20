import { combineReducers } from 'redux';
import auth from './auth';
import jobs from './jobs';
import loading from './loading';
import error from './error';
import positions from './positions';

export default combineReducers({ auth, jobs, positions, loading, error });
