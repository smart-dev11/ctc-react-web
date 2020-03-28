import request from '../utils/request';
import produce from 'immer';
import delay from 'p-min-delay';
import { ActionType } from 'redux-promise-middleware';
import { createSelector } from 'reselect';
import _ from 'lodash';
import fp from 'lodash/fp';

export const GET_POSITIONS = 'GET_POSITIONS';
export const ADD_POSITION = 'ADD_POSITION';
export const REMOVE_POSITION = 'REMOVE_POSITION';
export const SAVE_POSITION = 'SAVE_POSITION';
export const REMOVE_JOB = 'REMOVE_JOB';

export const getPositions = () => ({
  type: GET_POSITIONS,
  payload: delay(request.get('/positions/').then(fp.get('data')), 1500)
});

export const addPosition = name => ({
  type: ADD_POSITION,
  payload: delay(
    request.post('/positions/', { name }).then(fp.get('data')),
    1500
  )
});

export const removePosition = id => ({
  type: REMOVE_POSITION,
  payload: delay(request.delete(`/positions/${id}`), 1500),
  meta: { id }
});

export const savePosition = position => ({
  type: SAVE_POSITION,
  payload: delay(
    request.put(`/positions/${position.id}/`, position).then(fp.get('data')),
    1500
  )
});

export const removeJob = (positionId, jobId) => ({
  type: REMOVE_JOB,
  payload: delay(request.delete(`/jobs/${jobId}`), 1500),
  meta: { positionId, jobId }
});

const initialState = {};

export default produce((draft, { type, payload, meta }) => {
  switch (type) {
    case `${GET_POSITIONS}_${ActionType.Fulfilled}`:
      payload.forEach(position => {
        draft[position.id] = _.omit(position, ['jobs']);
        draft[position.id].jobs = {};
        position.jobs.forEach(job => {
          draft[position.id].jobs[job.id] = job;
        });
      });
      return;
    case `${ADD_POSITION}_${ActionType.Fulfilled}`:
      draft[payload.id] = payload;
      draft[payload.id].jobs = {};
      return;
    case `${REMOVE_POSITION}_${ActionType.Fulfilled}`:
      delete draft[meta.id];
      return;
    case `${SAVE_POSITION}_${ActionType.Fulfilled}`:
      draft[payload.id].name = payload.name;
      return;
    case `${REMOVE_JOB}_${ActionType.Fulfilled}`:
      delete draft[meta.positionId].jobs[meta.jobId];
      return;
    default:
      return;
  }
}, initialState);

export const positionsSelector = createSelector(
  fp.get('positions'),
  positions =>
    Object.values(positions).map(position => ({
      ...position,
      jobs: Object.values(position.jobs)
    }))
);

export const createJobsByPositionIdSelector = positionId =>
  fp.compose(fp.values, fp.getOr({}, `positions.${positionId}.jobs`));
