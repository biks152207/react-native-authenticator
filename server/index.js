const express = require('express'),
	  bodyParser = require('body-parser'),
	  cors = require('cors'),
	  app = express(),
	  morgan = require('morgan'),
	  router = require('./router'),
	  config = require('./config'),
	  passport = require('passport');

var port = 3000;

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());
app.use(passport.initialize());

require('./models')(config);
require('./passport')(config);

router(app);

app.listen(port);
console.log('Your server is running on', port);
