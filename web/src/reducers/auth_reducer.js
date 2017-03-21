import { TEST_ACTION,
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
  FETCH_ADMIN_MESSAGE,
  SET_ADMIN_PRIVILEGES
} from '../actions/types';

const INITIAL_STATE = { message: '' };

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case TEST_ACTION:
		  return { ...state, message: action.payload.message };
		 case AUTH_USER:
	      return { ...state, error: '', authenticated: true };
	    case UNAUTH_USER:
	      return { ...state, authenticated: false, admin_privileges: false };
	    case AUTH_ERROR:
	      return { ...state, error: action.payload };
	    case FETCH_MESSAGE:
	      return { ...state, message: action.payload };
	    case FETCH_ADMIN_MESSAGE:
	      return { ...state, message: action.payload };
	    case SET_ADMIN_PRIVILEGES:
	      return { ...state, admin_privileges: true };  
	}
	return state;
}