const bcrypt = require('bcrypt'),
	  User = require('mongoose').model('User'),
	  passportLocalStrategy = require('passport-local').Strategy;
import { authResponseGenerator } from '../helpers/response-generator';

module.exports = function(config) {

	return new passportLocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		session: false,
		passReqToCallback: true
	}, function(req, email, password, done) {
		let userData = {
			email: email.trim(),
			password: password.trim()
		};

		User.findOne({email: userData.email}, function(err, user) {
			if(err) { return done(err); }
			if(!user) {
				let error = new Error('User doesn\'t exist');
				error.name = 'IncorrectCredentialsError';
				return done(error);
			}

			user.comparePassword(userData.password, function(err, isMatch) {
				if(err) { return done(err); }

				if(!isMatch) {
					let error = new Error('Incorrect password');
					error.name = 'IncorrectCredentialsError';
					return done(error);
				}

				var payload = authResponseGenerator(user);

				return done(null, payload);
			});
		});
	});
};
