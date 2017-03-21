// Helps to generate the response payload
import { USER_ROLE,  SUCCESS_MESSAGE  } from './enums';
import _ from 'lodash';
const jwt = require('jsonwebtoken');
const config = require('../config');


export function authResponseGenerator(user){
  const userData = {
    name: user.name,
    social: user.social,
    role: user.role || USER_ROLE.DEFAULT_USER_ROLE,
  };
  let token = jwt.sign(userTokenGenerator(user), config.jwtSecret)
  return _.extend(SUCCESS_MESSAGE.LOGIN_SUCCESS, {userData, token});
}

function userTokenGenerator(userInfo){
  return {
    sub: userInfo._id,
    timestamp: new Date().getTime(),
    role: userInfo.role || USER_ROLE.DEFAULT_USER_ROLE
  };
}
