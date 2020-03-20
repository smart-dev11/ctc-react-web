import request from '../utils/request';
import produce from 'immer';
import delay from 'p-min-delay';
import { ActionType } from 'redux-promise-middleware';
import { createSelector } from 'reselect';
import _ from 'lodash';
import fp from 'lodash/fp';

export const GET_POSITIONS = 'GET_POSITIONS';

export const getPositions = () => ({
  type: GET_POSITIONS,
  payload: delay(request.get('/positions/').then(fp.get('data')), 1500)
});

const initialState = {
  byId: {}
};

export default produce((draft, action) => {
  switch (action.type) {
    case `${GET_POSITIONS}_${ActionType.Fulfilled}`:
      draft.byId = _.mapKeys(action.payload, 'id');
      return;
    default:
      return;
  }
}, initialState);

export const positionsSelector = createSelector(
  fp.get('positions.byId'),
  fp.values
);
