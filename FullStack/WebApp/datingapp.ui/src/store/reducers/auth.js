import * as actionTypes from '../actions/actionTypes';
import { updateObject } from './../utility';

const initialState = {
  token: null,
  decodedToken: null,
  error: null
};

const authStart = (state, action) => {
  return updateObject(state, { error: null });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    decodedToken: action.decodedToken,
    error: null
  });
};

const authFail = (state, action) => {
  return updateObject(state, { error: action.error });
};

const authLogoutSuccess = (state, action) => {
  return updateObject(state, {
    token: null,
    decodedToken: null
  });
};

const authRegisterUserStart = (state, action) => {
  return updateObject(state, { error: null });
};

const authRegisterUserFail = (state, action) => {
  return updateObject(state, { error: action.error });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogoutSuccess(state, action);
    case actionTypes.AUTH_REGISTER_USER_START:
      return authRegisterUserStart(state, action);
    case actionTypes.AUTH_REGISTER_USER_FAIL:
      return authRegisterUserFail(state, action);
    default:
      return state;
  }
};

export default reducer;
