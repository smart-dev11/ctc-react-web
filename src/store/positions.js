import request from '../utils/request';
import produce from 'immer';
import delay from 'p-min-delay';
import { ActionType } from 'redux-promise-middleware';
import { createSelector } from 'reselect';
import _ from 'lodash';
import fp from 'lodash/fp';

export const GET_POSITIONS = 'GET_POSITIONS';
export const ADD_POSITION = 'ADD_POSITION';

export const getPositions = () => ({
  type: GET_POSITIONS,
  payload: delay(request.get('/positions/').then(fp.get('data')), 1500)
});

export const addPosition = positionName => ({
  type: ADD_POSITION,
  payload: delay(
    request.post('/positions/', { name: positionName }).then(fp.get('data')),
    1500
  )
});

const initialState = {
  byId: {}
};

export default produce((draft, action) => {
  switch (action.type) {
    case `${GET_POSITIONS}_${ActionType.Fulfilled}`:
      draft.byId = _.mapKeys(action.payload, 'id');
      return;
    case `${ADD_POSITION}_${ActionType.Fulfilled}`:
      draft.byId[action.payload.id] = action.payload;
      return;
    default:
      return;
  }
}, initialState);

export const positionsSelector = createSelector(
  fp.get('positions.byId'),
  fp.values
);
