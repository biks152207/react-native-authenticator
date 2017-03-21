const express = require('express');
const _outController = require('./controllers/_our-controller');
const authController = require('./controllers/auth-controller');
const configController = require('./controllers/config-controller');
const config = require('./config');
const passport = require('passport');
const MongoClient = require('mongodb').MongoClient

module.exports = function(app) {
	const authRoutes = express.Router();
	const apiRoutes = express.Router();
  const openRoutes = express.Router();
	const adminRoutes = express.Router();
	const authCheckMiddleware = require('./middleware/auth-check')(config);
	const adminAccessMiddleware = require('./middleware/admin-access')(config);

	apiRoutes.get('/helloworld', _outController.helloworld);
	app.use('/api', authCheckMiddleware, adminAccessMiddleware);
	app.use('/api', apiRoutes);

	authRoutes.post('/signup', authController.signup);
	authRoutes.post('/login', authController.login);
	authRoutes.post('/config', configController.config)
	authRoutes.post('/facebook', authController.facebook);
	authRoutes.get('/facebook', passport.authenticate('facebook'));
	authRoutes.get('/facebook/callback', authController.facebookLogin, authController.facebookRedirect);
	authRoutes.post('/graph', configController.graph);
	authRoutes.post('/mongodb/test', (req, res) => {
		MongoClient.connect(req.body.MongodbURL, function(err, db) {
			if (!err) {
				return res.json({message: 'Connection sucessful'});
			} else {
				return res.status(409)
					.json({message: 'Invalid connection string'})
			}
		});
	});
	app.use('/auth', authRoutes);

  openRoutes.head('/', (req, res) => { res.status(204).send(); });
	app.use('/', openRoutes);

	//adminRoutes.get('/dashboard', _outController.dashboard);

	//app.use('/admin', authCheckMiddleware, adminAccessMiddleware);
	//app.use('/admin', adminRoutes);

};
