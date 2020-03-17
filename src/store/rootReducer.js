import { combineReducers } from 'redux';
import auth from './auth';
import jobs from './jobs';
import loading from './loading';
import error from './error';

export default combineReducers({ auth, jobs, loading, error });
