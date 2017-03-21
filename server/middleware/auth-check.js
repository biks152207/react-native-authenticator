const jwt = require('jsonwebtoken'),
	  User = require('mongoose').model('User');

module.exports = function(config) {

	return function(req, res, next) {
		if(!req.headers.authorization) {
			return res.status(401).end();
		}

		let token = req.headers.authorization.split(' ')[1];

		jwt.verify(token, config.jwtSecret, function(err, decode) {
			if(err) { return res.status(401).end(); }

			let userId = decode.sub;

			User.findById(userId, function(err, user) {
				if(err || !user) { return res.status(401).end(); }

				return next();
			});
		});
	};
};