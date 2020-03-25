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
  payload: delay(request.delete(`/positions/${id}`).then(fp.get('data')), 1500),
  meta: { id }
});

export const savePosition = position => ({
  type: SAVE_POSITION,
  payload: delay(
    request.put(`/positions/${position.id}/`, position).then(fp.get('data')),
    1500
  )
});

const initialState = {
  byId: {}
};

export default produce((draft, { type, payload, meta }) => {
  switch (type) {
    case `${GET_POSITIONS}_${ActionType.Fulfilled}`:
      draft.byId = _.mapKeys(payload, 'id');
      return;
    case `${ADD_POSITION}_${ActionType.Fulfilled}`:
      draft.byId[payload.id] = payload;
      return;
    case `${REMOVE_POSITION}_${ActionType.Fulfilled}`:
      delete draft.byId[meta.id];
      return;
    default:
      return;
  }
}, initialState);

export const positionsSelector = createSelector(
  fp.get('positions.byId'),
  fp.values
);
