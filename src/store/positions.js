import request from '../utils/request';
import produce from 'immer';
import delay from 'p-min-delay';
import { ActionType } from 'redux-promise-middleware';
import { createSelector } from 'reselect';
import fp from 'lodash/fp';
import { schema, normalize } from 'normalizr';
import { REMOVE_JOB } from './jobs';

export const GET_POSITIONS = 'GET_POSITIONS';
export const ADD_POSITION = 'ADD_POSITION';
export const REMOVE_POSITION = 'REMOVE_POSITION';
export const SAVE_POSITION = 'SAVE_POSITION';

export const getPositions = () => ({
  type: GET_POSITIONS,
  payload: delay(
    request
      .get('/positions/')
      .then(fp.get('data'))
      .then(data => {
        const job = new schema.Entity('jobs');
        const position = new schema.Entity('positions', { jobs: [job] });
        const { entities } = normalize(data, [position]);
        console.log(entities);
        return entities;
      }),
    1500
  )
});

export const addPosition = name => ({
  type: ADD_POSITION,
  payload: delay(
    request.post('/positions/', { name }).then(fp.get('data')),
    1500
  )
});

export const removePosition = id => (dispatch, getState) =>
  dispatch({
    type: REMOVE_POSITION,
    payload: delay(request.delete(`/positions/${id}`), 1500),
    meta: makePositionSelector(id)(getState())
  });

export const savePosition = position => ({
  type: SAVE_POSITION,
  payload: delay(
    request.put(`/positions/${position.id}/`, position).then(fp.get('data')),
    1500
  )
});

const initialState = {};

export default produce((draft, { type, payload, meta }) => {
  switch (type) {
    case `${GET_POSITIONS}_${ActionType.Fulfilled}`:
      return payload.positions;
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
      draft[meta.position].splice(draft[meta.position].indexOf(meta.id));
      return;
    default:
      return;
  }
}, initialState);

export const positionsSelector = createSelector(
  fp.get('positions'),
  fp.get('jobs'),
  (positions, jobs) => {
    return Object.values(positions).map(position => ({
      ...position,
      jobs: (position.jobs || []).map(id => jobs[id])
    }));
  }
);

export const makePositionSelector = id => fp.get(['positions', id]);
