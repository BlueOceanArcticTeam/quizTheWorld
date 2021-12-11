const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const axios = require('axios');
const keys = require('./keys');

// decide which middleware we are going to use for our app
passport.use(new GoogleStrategy({
  // options for the strategy
  // these are configured on mbolsen's developer console
  callbackURL: 'http://localhost:3000/api/auth/google/redirect', // might neet to add api/ at the beginning
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret,
}, (accessToken, refreshToken, profile, done) => {
  // passport callback function to exchange key for profile information
  console.log(profile);
  console.log('passport callback function fired');
  // Pull out information from the profile
  const email = profile.emails[0].value;
  const userInformation = {
    username: email.substring(0, email.indexOf('@')),
    password: 'token?',
    firstname: profile.name.givenName,
    lastname: profile.name.familyName,
    thumbnail_url: profile.photos[0].value,
    email: profile.emails[0].value,
  };

  console.log('\n\nUserInformation', userInformation);
  // TODO: See if we have already confirmed that person as a user
  axios.get('/api/users');
  // if so, then send them as an approved user
  // TODO: add user to DB if they do not already exist

  done();
}));
