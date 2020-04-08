import request from '../utils/request';
import produce from 'immer';
import delay from 'p-min-delay';
import { ActionType } from 'redux-promise-middleware';
import { createSelector } from 'reselect';
import fp from 'lodash/fp';
import _ from 'lodash';
import { schema, normalize } from 'normalizr';
import { REMOVE_JOB, CHANGE_JOB_POSITION } from './jobs';

export const GET_POSITIONS = 'GET_POSITIONS';
export const ADD_POSITION = 'ADD_POSITION';
export const REMOVE_POSITION = 'REMOVE_POSITION';
export const SAVE_POSITION = 'SAVE_POSITION';
export const MOVE_POSITION = 'MOVE_POSITION';

export const getPositions = () => ({
  type: GET_POSITIONS,
  payload: delay(
    request
      .get('/positions/')
      .then(fp.get('data'))
      .then((data) => {
        const job = new schema.Entity('jobs');
        const position = new schema.Entity('positions', { jobs: [job] });
        const { entities } = normalize(data, [position]);
        return entities;
      }),
    1500
  ),
});

export const addPosition = (name) => ({
  type: ADD_POSITION,
  payload: delay(
    request.post('/positions/', { name }).then(fp.get('data')),
    1500
  ),
});

export const removePosition = (id) => (dispatch, getState) =>
  dispatch({
    type: REMOVE_POSITION,
    payload: delay(request.delete(`/positions/${id}`), 1500),
    meta: makePositionSelector(id)(getState()),
  });

export const savePosition = (position) => ({
  type: SAVE_POSITION,
  payload: delay(
    request.put(`/positions/${position.id}/`, position).then(fp.get('data')),
    1500
  ),
});

export const movePosition = (id, order) => (dispatch, getState) =>
  dispatch({
    type: MOVE_POSITION,
    payload: delay(request.put(`/positions/${id}/move/`, { order }), 1500),
    meta: { position: makePositionSelector(id)(getState()), order },
  });

const initialState = {};

export default produce((draft, { type, payload, meta }) => {
  switch (type) {
    case `${GET_POSITIONS}_${ActionType.Fulfilled}`:
      return payload.positions || {};
    case `${ADD_POSITION}_${ActionType.Fulfilled}`:
      draft[payload.id] = payload;
      return;
    case `${REMOVE_POSITION}_${ActionType.Fulfilled}`:
      delete draft[meta.id];
      return;
    case `${SAVE_POSITION}_${ActionType.Fulfilled}`:
      draft[payload.id].name = payload.name;
      return;
    case `${REMOVE_JOB}_${ActionType.Fulfilled}`:
      draft[meta.position].jobs.splice(
        draft[meta.position].jobs.indexOf(meta.id),
        1
      );
      return;
    case `${CHANGE_JOB_POSITION}_${ActionType.Fulfilled}`:
      draft[meta.job.position].jobs.splice(
        draft[meta.job.position].jobs.indexOf(meta.job.id),
        1
      );
      draft[meta.position.id].jobs.push(meta.job.id);
      return;
    case `${MOVE_POSITION}_${ActionType.Pending}`:
      if (meta.position.order > meta.order) {
        for (const id in draft) {
          if (
            draft[id].order < meta.position.order &&
            draft[id].order >= meta.order &&
            draft[id].id !== meta.position.id
          )
            draft[id].order += 1;
        }
      } else {
        for (const id in draft) {
          if (
            draft[id].order <= meta.order &&
            draft[id].order > meta.position.order &&
            draft[id].id !== meta.position.id
          )
            draft[id].order -= 1;
        }
      }
      draft[meta.position.id].order = meta.order;
      return;
    default:
      return;
  }
}, initialState);

export const positionsSelector = createSelector(
  fp.get('positions'),
  fp.get('jobs'),
  (positions, jobs) => {
    const arr = Object.values(positions).map((position) => ({
      ...position,
      jobs: (position.jobs || []).map((id) => jobs[id]),
    }));
    return _.sortBy(arr, 'order');
  }
);

export const makePositionSelector = (id) => fp.get(['positions', id]);
