import { AUTH } from '../../app/common/enums';
import { asyncStorage, authErrorBuilder, loginWithFacebook, processFormCallback} from '../../app/common/helper';
import { asyncActionNames, buildAsyncActions} from '../services/actionCreator';
import { Actions } from 'react-native-router-flux';


// Build action names for login
const actionNames = asyncActionNames('LOGIN');
const actionCreators = buildAsyncActions(actionNames);

export function processForm({email, password}) {
	return function(dispatch) {
		dispatch(actionCreators.progress())
		fetch(AUTH.LOGIN, {
			method: 'POST',
			headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
			body: JSON.stringify({
		    email: email,
		    password: password,
		  })
		})
		.then((response) => response.json())
		.then((responseData) => {
				processFormCallback(responseData, dispatch);
		})
		.catch((error) => {
				authErrorBuilder(error)
					.then((res) =>{
						dispatch(actionCreators.failure(res));
					})
		}).done();
	};
};

export  function facebookLogin(){
	return function(dispatch){
		dispatch(actionCreators.progress());
		loginWithFacebook()
			.then((result) =>{
				let user = {
          name: result.user.name,
          email: result.user.email,
          social: {
            facebook: {
              id: result.user.id,
              token: result.accessToken
            }
          }
        }
				fetch(AUTH.FACEBOOK, {
					method: 'POST',
					headers: {
				    'Accept': 'application/json',
				    'Content-Type': 'application/json',
				  },
					body: JSON.stringify(user)
				})
				.then((response) => response.json())
				.then((responseData) =>{
					processFormCallback(responseData, dispatch);
				})
			})
	}
}
