import _ from 'lodash';

export default (state = {}, action) => {
  const matches = /(.*)_(PENDING|REJECTED)/.exec(action.type);
  if (!matches) {
    return state;
  }

  const [, requestName, requestState] = matches;
  return {
    ...state,
    [requestName]: requestState === 'REJECTED' ? action.payload : ''
  };
};

export const makeErrorSelector = actions => state => {
  return (
    _(actions)
      .map(action => _.get(state, `error.${action}`))
      .compact()
      .first() || ''
  );
};
