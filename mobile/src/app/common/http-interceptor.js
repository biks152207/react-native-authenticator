import fetchIntercept from 'fetch-intercept';
import { alert } from './alert';
import { Actions } from 'react-native-router-flux';
import {
  UNAUTH_USER,
  DUPLICATE_USER,
  INCORRECT_USER_CREDENTIAL
} from './enums';

export const interceptor = fetchIntercept.register({
  request: function(url, config){
    // We can modify the url or config here
    return [url, config]
  },

  requestError: function(error){
    return Promise.reject(error);
  },

  response: function(response){
    // Can modify the response from here
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else if (response.status === 401) {
      alert(UNAUTH_USER);
      Actions.login();
      return;
    } else {
      return Promise.reject(response.json());
    }
    return response;
  },

  responseError: function(error){
    return Promise.reject(error);
  }
})
