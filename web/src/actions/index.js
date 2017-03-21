import axios from 'axios';
import { TEST_ACTION, UNAUTH_USER } from './types';

const API_URL = 'http://localhost:3000/api';

export function testAction() {
	return function(dispatch) {
		var headers = { 
				authorization: 'Bearer ' + localStorage.getItem('token'),
				user: localStorage.getItem('user')
			} 
		axios.get(`${API_URL}/helloworld`, { 
			headers: headers 
		})
		.then(response => {
			dispatch({
				type: TEST_ACTION,
				payload: response.data
			});
		})
		.catch((error) => {
			console.log(error);
		})
	}
}

export function signOutAction() {
	return {
		type: UNAUTH_USER
	};
};