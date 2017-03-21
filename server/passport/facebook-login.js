var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;


module.exports = function(config) {
  return new FacebookStrategy({
      clientID: config.facebook.client_id,
      clientSecret: config.facebook.client_secret,
      callbackURL: config.facebook.callback_url
    },
    function(accessToken, refreshToken, profile, done) {
      done(null, accessToken, profile);
    }
  );
};
