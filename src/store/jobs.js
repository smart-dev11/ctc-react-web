import produce from 'immer';
import { ActionType } from 'redux-promise-middleware';
import { GET_POSITIONS, REMOVE_POSITION } from './positions';
import request from '../utils/request';
import delay from 'p-min-delay';
import fp from 'lodash/fp';
import _ from 'lodash';

export const REMOVE_JOB = 'REMOVE_JOB';
export const UPLOAD_RESUME = 'UPLOAD_RESUME';
export const CHANGE_JOB_POSITION = 'CHANGE_JOB_POSITION';
export const SAVE_JOB = 'SAVE_JOB';

export const removeJob = (id) => (dispatch, getState) =>
  dispatch({
    type: REMOVE_JOB,
    payload: delay(request.delete(`/jobs/${id}`), 1500),
    meta: makeJobSelector(id)(getState()),
  });

export const uploadResume = (id, file) => {
  const formData = new FormData();
  if (file) {
    formData.append('resume', file);
  }

  return {
    type: UPLOAD_RESUME,
    payload: delay(
      request.put(`/jobs/${id}/resume_upload/`, formData).then(fp.get('data')),
      1500
    ),
    meta: { id },
  };
};

export const changeJobPosition = (job, position) => ({
  type: CHANGE_JOB_POSITION,
  payload: delay(
    request.put(`/jobs/${job.id}/position_change/`, { position: position.id }),
    1500
  ),
  meta: { job, position },
});

export const saveJob = (job) => ({
  type: SAVE_JOB,
  payload: delay(
    request.put(`/jobs/${job.id}/`, job).then(fp.get('data')),
    1500
  ),
});

const initialState = {};

export default produce((draft, { type, payload, meta }) => {
  switch (type) {
    case `${GET_POSITIONS}_${ActionType.Fulfilled}`:
      return payload.jobs || {};
    case `${REMOVE_JOB}_${ActionType.Fulfilled}`:
      delete draft[meta.id];
      return;
    case `${UPLOAD_RESUME}_${ActionType.Fulfilled}`:
      draft[meta.id].resume = payload.resume;
      draft[meta.id].resume_text = payload.resume_text;
      draft[meta.id].resume_keywords = payload.resume_keywords;
      draft[meta.id].score = payload.score;
      return;
    case `${REMOVE_POSITION}_${ActionType.Fulfilled}`:
      meta.jobs.forEach((id) => {
        delete draft[id];
      });
      return;
    case `${CHANGE_JOB_POSITION}_${ActionType.Fulfilled}`:
      draft[meta.job.id].position = meta.position.id;
      return;
    case `${SAVE_JOB}_${ActionType.Fulfilled}`:
      draft[payload.id] = payload;
      return;
    default:
      return;
  }
}, initialState);

export const makeJobSelector = (id) => fp.get(['jobs', id]);

export const makeJobsSelector = (positionId) => (state) =>
  _.get(state.positions, [positionId, 'jobs'], []).map((id) => state.jobs[id]);
