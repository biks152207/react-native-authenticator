const validator = require('validator'),
      passport = require('passport'),
      User = require('../models/user');
import { USER_ROLE } from '../helpers/enums';
import { authResponseGenerator } from '../helpers/response-generator';


exports.signup = function(req, res, next) {
  let validationResult = validateSignupForm(req.body);
	if(!validationResult.success) {
		return res.status(400).json({
			success: false,
			message: validationResult.message,
			errors: validationResult.errors
		});
	}

  passport.authenticate('local-signup', function(err, payload) {
    if(err) {
      if(err.name === 'MongoError' && err.code === 11000) {
        return res.status(409).json({
          success: false,
          message: 'Check the form for errors',
          errors: {
            email: 'This email is already taken'
          }
        });
      }
      return res.status(400).json({
        success: false,
        message: 'Could not process the form'
      });
    }
    return res.json(payload);

  })(req, res, next);
};

exports.facebookLogin = (req, res, next) => {

   passport.authenticate('facebook', {
            failureRedirect: 'http://localhost:8082/login',
            session: false }
   )(req, res, next);
};

exports.facebookRedirect = (req, res, next) => {
  res.redirect('http://localhost:8082?token='+req.user);
};

exports.login = function(req, res, next) {
  let validationResult = validateLoginForm(req.body);
	if(!validationResult.success) {
		return res.status(400).json({
			success: false,
			message: validationResult.message,
			errors: validationResult.errors
		});
	}

  passport.authenticate('local-login', function(err, payload) {
    if(err) {
      if(err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: 'Check the form for errors',
          errors: { email: err.message }
        })
      }
      return res.status(400).json({
        success: false,
        message: 'Could not process the form'
      });
    }
    return res.json(payload)
  })(req, res, next);
};

exports.facebook = function(req, res){
  User.findOne({email: req.body.email})
    .exec(function(err, response){
      if (response){
        return res.json(authResponseGenerator(req.body))
      }
      else{
        req.body.role = req.body.role || USER_ROLE.DEFAULT_USER_ROLE;
        var newUser = new User(req.body);
        newUser.save(function(err, user){
          if (!err){
            return res.json(authResponseGenerator(user))
          }
        })
      }
    })
}

/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result, errors tips, and a global message for a whole form.
 */
function validateSignupForm(payload) {
  let isFormValid = true;
  let errors = {};
  let message = '';
  if (!payload.email || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.email = "Please provide a correct email address.";
  }

  if(!payload.social) {
    if (!payload.password || !validator.isLength(payload.password, 8)) {
      isFormValid = false;
      errors.password = "Password must have at least 8 characters.";
    }
  }

  if (!payload.name || payload.name.length === 0) {
    isFormValid = false;
    errors.name = "Please provide your name.";
  }

  if (!isFormValid) {
    message = "Check the form for errors.";
  }

  return {
    success: isFormValid,
    message: message,
    errors: errors
  };
}

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result, errors tips, and a global message for the whole form.
 */
function validateLoginForm(payload) {
  let isFormValid = true;
  let errors = {};
  let message = '';
  if (!payload.email) {
    isFormValid = false;
    errors.email = "Please provide your email address.";
  }

  if (!payload.password || payload.password.length === 0) {
    isFormValid = false;
    errors.password = "Please provide your password.";
  }

  if (!isFormValid) {
    message = "Check the form for errors.";
  }

  return {
    success: isFormValid,
    message: message,
    errors: errors
  };
}
