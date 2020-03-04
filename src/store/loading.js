import _ from 'lodash';

export default (state = {}, action) => {
  const matches = /(.*)_(PENDING|FULFILLED|REJECTED)/.exec(action.type);
  if (!matches) {
    return state;
  }

  const [, requestName, requestState] = matches;
  return {
    ...state,
    [requestName]: requestState === 'PENDING'
  };
};

export const createLoadingSelector = actions => state =>
  _(actions).some(action => _.get(state, `loading.${action}`));
