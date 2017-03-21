import { AUTH } from '../../app/common/enums';
import { asyncStorage, authErrorBuilder, processFormCallback } from '../../app/common/helper';
import { asyncActionNames, buildAsyncActions} from '../services/actionCreator';

// Build action names for login
const actionNames = asyncActionNames('LOGIN');
const actionCreators = buildAsyncActions(actionNames);


export function processSignupForm(obj){
  return function(dispatch){
    dispatch(actionCreators.progress());
    fetch(AUTH.SIGNUP, {
			method: 'POST',
			headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
			body: JSON.stringify(obj)
		})
    .then((response) => response.json())
		.then((responseData) =>{
      processFormCallback(responseData, dispatch);
    })
    .catch((error) => {
      authErrorBuilder(error)
        .then((res) =>{
          dispatch(actionCreators.failure(res));
        });
    })
  }
}
