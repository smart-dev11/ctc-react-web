import { combineReducers } from 'redux';
import auth from './auth';
import loading from './loading';
import error from './error';
import positions from './positions';
import jobs from './jobs';

export default combineReducers({ auth, positions, jobs, loading, error });
