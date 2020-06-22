import { ActionType } from "redux-promise-middleware";
import produce from "immer";
import fp from "lodash/fp";
import request from "../utils/request";

export const LOGIN = "LOGIN";
export const REGISTER = "REGISTER";
export const LOGOUT = "LOGOUT";

export const register = (email, password) => (dispatch) =>
  dispatch({
    type: REGISTER,
    payload: request
      .post("/accounts/register", { email, password })
      .then(fp.get("data")),
  }).then((data) => {
    localStorage.setItem("token", data.token);
    return data;
  });

export const login = (email, password) => (dispatch) =>
  dispatch({
    type: LOGIN,
    payload: request
      .post("/accounts/login", { email, password })
      .then(fp.get("data")),
  }).then(({ value }) => {
    localStorage.setItem("token", value.token);
  });

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT });
};

const initialState = {
  loggedin: !!localStorage.getItem("token"),
};

export default produce((draft, action) => {
  switch (action.type) {
    case `${REGISTER}_${ActionType.Fulfilled}`:
      draft.loggedin = true;
      return;
    case `${LOGIN}_${ActionType.Fulfilled}`:
      draft.loggedin = true;
      return;
    case LOGOUT:
      draft.loggedin = false;
      return;
    default:
      return;
  }
}, initialState);
