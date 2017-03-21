module.exports = function() {

	return function(req, res, next) {
		if(JSON.parse(req.headers.user).role === 'admin') {
			return next();
		}

		return res.status(403).json({
			success: false,
			message: 'Unauthorized to access the current page'
		});
	}
};