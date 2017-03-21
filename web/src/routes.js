import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Dashboard from './components/dashboard';
import Login from './containers/login/login';
import Home from './components/home';
import SignUp from './components/signupForm';
import SignOut from './components/signOut';
import Configure from './components/configure';
import RequireAdmin from './components/requireAdmin';

export default (
	<Route path='/' component={App}>
	  <IndexRoute component={Dashboard} />
	  <Route path='dashboard' component={Dashboard} />
	  <Route path='login' component={Login} />
	  <Route path='home' component={RequireAdmin(Home)} /> 
	  <Route path='configure' component={Configure} /> 
	  <Route path='signup' component={SignUp} />
	  <Route path='signout' component={SignOut} />
	</Route>
);
