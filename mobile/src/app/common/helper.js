import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { alert } from './alert';
import { signInErrorAction, setAdminPrevilegeAction,  signInAction} from '../../scenes/login/login.action';
import { LoginManager, GraphRequest, GraphRequestManager, AccessToken} from 'react-native-fbsdk';
import { asyncActionNames, buildAsyncActions} from '../../scenes/services/actionCreator';
import { AUTH } from './enums';


export async function asyncStorage(key, data){
  if (typeof data === 'object'){
    data = JSON.stringify(data);
  }
  const store = await AsyncStorage.setItem(key, data);
  return store;
}

export async  function authErrorBuilder(error, dispatch){

  const errMessage = await new Promise((resolve, reject) =>{
    error.then((res) =>{
      var message;
      if (res.errors.password){
        message = res.errors.password;
      }
      if (res.errors.name){
        message = res.errors.name;
      }
      if (res.errors.email){
        message = res.errors.email;
      }
      resolve(message);
    })

  })
  alert(errMessage);
  return errMessage;
}

export function handleFacebookLogout(dispatch){
  LoginManager.logOut();
}

const getFacebookAccessToken = () =>{
  return new Promise((resolve, reject) =>{
    AccessToken.getCurrentAccessToken()
    .then((data) => {
      resolve(data.accessToken);
    })
  })

}
const facebookResponseHandler = (accessToken) =>{
  return new Promise((resolve, reject) =>{
    const responseInfoCallback = (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    }
    const infoRequest = new GraphRequest(
      '/me',
      {
        accessToken: accessToken,
        parameters: {
          fields: {
            string: 'email,name,first_name,middle_name,last_name'
          }
        }
      },
      responseInfoCallback
    );
    return new GraphRequestManager().addRequest(infoRequest).start()
  })

}
export async function loginWithFacebook(){
  const data = await LoginManager.logInWithPublishPermissions();
  let accessToken = await getFacebookAccessToken();
  const fbResponse = await facebookResponseHandler(accessToken);
  return {user: fbResponse, accessToken};
}

export async function processFormCallback(responseData, dispatch){
  const storage = [
   asyncStorage('token', responseData.token),
   asyncStorage('user', responseData.userData)
 ];
 const result = await Promise.all(storage)
  .then((res) =>{
    const actionNames = asyncActionNames('LOGIN');
    const actionCreators = buildAsyncActions(actionNames);
    dispatch(actionCreators.success(responseData.userData));
    dispatch(actionCreators.admin_privileges());
    Actions.home();
  })
 return result;
}
