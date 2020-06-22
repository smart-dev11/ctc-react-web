import { ActionType } from "redux-promise-middleware";
import produce from "immer";
import fp from "lodash/fp";

import { GET_POSITIONS, REMOVE_POSITION } from "./positions";
import request from "../utils/request";
import _ from "lodash";

export const REMOVE_JOB = "REMOVE_JOB";
export const UPLOAD_RESUME = "UPLOAD_RESUME";
export const CHANGE_JOB_POSITION = "CHANGE_JOB_POSITION";
export const SAVE_JOB = "SAVE_JOB";

export const removeJob = (id) => (dispatch, getState) =>
  dispatch({
    type: REMOVE_JOB,
    payload: request.delete(`/jobs/${id}`),
    meta: makeJobSelector(id)(getState()),
  });

export const uploadResume = (id, file) => {
  const formData = new FormData();
  if (file) {
    formData.append("resume", file);
  }

  return {
    type: UPLOAD_RESUME,
    payload: request
      .put(`/jobs/${id}/resume_upload/`, formData)
      .then(fp.get("data")),
    meta: { id },
  };
};

export const changeJobPosition = (job, position) => ({
  type: CHANGE_JOB_POSITION,
  payload: request.put(`/jobs/${job.id}/position_change/`, {
    position: position.id,
  }),
  meta: { job, position },
});

export const saveJob = (job) => ({
  type: SAVE_JOB,
  payload: request.put(`/jobs/${job.id}/`, job).then(fp.get("data")),
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
      draft[meta.id] = pyaload;
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

export const makeJobSelector = (id) => fp.get(["jobs", id]);

export const makeJobsSelector = (positionId) => (state) =>
  _.get(state.positions, [positionId, "jobs"], []).map((id) => state.jobs[id]);
