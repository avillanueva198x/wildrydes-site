import http from './httpService';
import jwtDecode from 'jwt-decode';

const apiEndpoint = '/auth';
const tokenKey = 'token';

export async function login(model) {
  const { data: response } = await http.post(apiEndpoint + '/login', model);
  if (response) {
    localStorage.setItem(tokenKey, response.token);
  }
  return response;
}

export function trySignUp() {
  let crendentials = null;
  try {
    const token = getJwt();
    if (token) {
      const decodedToken = getDecodedtoken();
      crendentials = {
        token,
        decodedToken
      };
    }
  } catch (error) {
    return null;
  }
  return crendentials;
}

export function register(user) {
  return http.post(apiEndpoint + '/register', user);
}

export function getLocalStorageItem(key) {
  return localStorage.getItem(key);
}

export function getJwt() {
  return getLocalStorageItem(tokenKey);
}

export function getDecodedtoken() {
  try {
    const token = getJwt();
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export default {
  login,
  register,
  getDecodedtoken,
  logout,
  getJwt,
  trySignUp
};
