const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');

// decide which middleware we are going to use for our app
passport.use(new GoogleStrategy({
  // options for the strategy

  // these are configured on mbolsen's developer console
  callbackURL: 'api/auth/google/redirect', // might neet to add api/ at the beginning
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret,
}, () => {
  // passport callback function
}));
