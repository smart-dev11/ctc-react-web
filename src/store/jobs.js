import request from '../utils/request';
import produce from 'immer';
import delay from 'p-min-delay';
import { ActionType } from 'redux-promise-middleware';
import { createSelector } from 'reselect';
import _ from 'lodash';
import fp from 'lodash/fp';

export const GET_JOBS = 'GET_JOBS';

export const getJobs = () => dispatch =>
  dispatch({
    type: GET_JOBS,
    payload: delay(request.get('/jobs/').then(fp.get('data')), 1500)
  });

const initialState = {
  byId: {}
};

export default produce((draft, action) => {
  switch (action.type) {
    case `${GET_JOBS}_${ActionType.Fulfilled}`:
      draft.byId = _.mapKeys(action.payload, 'id');
      return;
    default:
      return;
  }
}, initialState);

export const jobsSelector = createSelector(fp.get('jobs.byId'), fp.values);
