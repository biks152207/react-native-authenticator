import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import reduxThunk from 'redux-thunk';
import jwt_decode from 'jwt-decode';

import { AUTH_USER } from './actions/types';
import { SET_ADMIN_PRIVILEGES } from './actions/types';

require('./assets/stylesheets/base.scss');
require('./assets/stylesheets/lemonade.scss');
require('./assets/stylesheets/navigation.scss');

import { Router, browserHistory } from 'react-router';
import reducers from './reducers/index';
import routes from './routes';

const createStoreWithMiddlware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddlware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const token = localStorage.getItem('token');
// update application state with token information if needed
if (token) {
  // update authentication flag
  store.dispatch({ type: AUTH_USER });

  // update admin privileges if needed
  let decoded_token = jwt_decode(token);
  console.log(decoded_token)
  if (decoded_token.role == 'admin') {
    store.dispatch({ type: SET_ADMIN_PRIVILEGES });
  }

}

ReactDOM.render(
	<Provider store={ store }>
		<Router history={browserHistory} routes={routes} />
	</Provider>, 
		document.querySelector('#app'));
