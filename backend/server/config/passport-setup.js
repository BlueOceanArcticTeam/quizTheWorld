const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const axios = require('axios');
const keys = require('./keys');
const db = require('../../database/db.js');

// check the db for the user by google_id
const googleCheck = (googleId) => {
  console.log('google_id', googleId);
  db.query('SELECT * FROM users WHERE google_id = $1;', [googleId], (err, data) => {
    if (err) { throw err; } else {
      console.log('here googleCheck', data.rows[0]);
      return data.rows[0];
    }
    // TODO: res.send();
  });
};

// add the user to the db
const addGoogleUser = (info, callback) => {
  db.query(
    'INSERT INTO users(google_id, username, password,firstname,lastname,thumbnail_url,email) VALUES ($1,$2,$3, $4, $5, $6, $7) RETURNING *;',
    [info.google_id, info.username, info.password, info.firstname, info.lastname, info.thumbnail_url, info.email],
    (err, data) => {
      if (err) {
        throw err;
      } else {
        console.log('new User added', data.rows[0]);
        callback(data.rows[0].id);
        console.log('done adding user');
        // return data.rows[0];
      }
    },
  );
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('here i am');
  db.query('SELECT * FROM users WHERE id=$1', [id], (err, user) => {
    if (err) {
      throw err;
    } else {
      done(null, user);
    }
  });
});

passport.use(new GoogleStrategy({
  // options for the strategy
  // these are configured on mbolsen's developer console
  callbackURL: 'http://localhost:3000/api/auth/google/redirect', // might neet to add api/ at the beginning
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret,
}, (accessToken, refreshToken, profile, done) => {
  // passport callback function to exchange key for profile information
  // Pull out information from the profile
  const email = profile.emails[0].value;
  const userInformation = {
    google_id: profile.id,
    username: email.substring(0, email.indexOf('@')),
    password: 'token?',
    firstname: profile.name.givenName,
    lastname: profile.name.familyName,
    thumbnail_url: profile.photos[0].value,
    email: profile.emails[0].value,
  };

  console.log('\n\nUserInformation', userInformation);
  // TODO: See if we have already confirmed that person as a user
  // console.log('GOOGLE CHECK=', googleCheck(userInformation.google_id));
  const checkUser = async () => {
    // this async await is not waiting for the function to return...FIXME
    const user = await googleCheck(userInformation.google_id);
    console.log(user);
    if (user.id > 0) {
    // user exists in the db
      console.log('user exists');
      done(null, user.id);
    } else {
    // need to save this user to the db
      console.log('user does not exist');
      addGoogleUser(userInformation, (id) => {
        done(null, id);
      });
    }
  };
  checkUser();
}));
