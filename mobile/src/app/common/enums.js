export const UNAUTH_USER = 'Authorized access. Please login';
export const DUPLICATE_USER = 'User already registered';
export const INCORRECT_USER_CREDENTIAL = 'Incorrect login information';
export const API_URI = 'http://localhost:3000/' ;
export const AUTH ={
  LOGIN: API_URI + 'auth/login',
  SIGNUP: API_URI + 'auth/signup',
  FACEBOOK: API_URI + 'auth/facebook',
  CONFIG: API_URI + 'auth/config',
  MONGO: API_URI + 'auth/mongodb/test',
  GRAPH: API_URI + 'auth/graph'
}
