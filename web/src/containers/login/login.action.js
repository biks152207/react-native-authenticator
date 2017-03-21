import { AUTH_USER, SET_ADMIN_PRIVILEGES, AUTH_ERROR} from './login.types';

export function signInAction() {
	return {
		type: AUTH_USER
	};
};

export function setAdminPrevilegeAction() {
	return {
		type: SET_ADMIN_PRIVILEGES
	};
};

export function signInErrorAction(errors) {
	return {
		type: AUTH_ERROR,
		errors
	};
};