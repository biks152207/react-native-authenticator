const mongoose = require('mongoose');
const enums = require('../helpers/enums');

module.exports = function(config, cb) {
	mongoose.Promise = global.Promise;
	if(mongoose.connection && mongoose.connection.db) { mongoose.connection.db.close(); }
	mongoose.connect(config.db, (err) => {
		if(err) { throw err; }
		require('./user');
		if(typeof cb === 'function') { cb(enums.SUCCESS_MESSAGE.DB_SUCCESS); }
	});
};
