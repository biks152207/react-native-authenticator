import { combineReducers } from 'redux';
import AuthReducer from './auth_reducer';
import LoginReducer from '../containers/login/login.reducer';

const rootReducer = combineReducers({
	auth: AuthReducer,
	login: LoginReducer
});

export default rootReducer;