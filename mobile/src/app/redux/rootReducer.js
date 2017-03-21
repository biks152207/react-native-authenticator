import { combineReducers } from 'redux';
import LoginReducer from '../../scenes/login/login.reducer';

const rootReducer = combineReducers({
	login: LoginReducer
});

export default rootReducer;
