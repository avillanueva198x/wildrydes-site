import authService from '../../services/authService';
import * as actionTypes from './actionTypes';
import alertify from 'alertifyjs';

export const authStart = () => {
  return { type: actionTypes.AUTH_START };
};

export const authSuccess = (token, decodedToken) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    decodedToken: decodedToken
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logoutSuccess = () => {
  return { type: actionTypes.AUTH_LOGOUT };
};

export const authRegisterUserStart = () => {
  return { type: actionTypes.AUTH_REGISTER_USER_START };
};

export const authRegisterUserFail = error => {
  return { type: actionTypes.AUTH_REGISTER_USER_FAIL, error: error };
};

export const logout = () => {
  return dispatch => {
    authService.logout();
    dispatch(logoutSuccess());
  };
};

export const trySignUp = () => {
  return dispatch => {
    const credentials = authService.trySignUp();
    if (!credentials) dispatch(logout());
    else {
      dispatch(authSuccess(credentials.token, credentials.decodedToken));
    }
  };
};

export const login = model => {
  return async dispatch => {
    dispatch(authStart());
    try {
      const respose = await authService.login(model);
      dispatch(authSuccess(respose.token, authService.getDecodedtoken()));
      alertify.success('Logged in succesfully');
    } catch (error) {
      console.log(error);
      alertify.error(error);
    }
  };
};

export const registerUser = user => {
  return async dispatch => {
    dispatch(authRegisterUserStart());
    try {
      await authService.register(user);
      dispatch(login(user));
      alertify.success('Registration successful');
    } catch (error) {
      console.log(error);
      alertify.error(error);
    }
  };
};
