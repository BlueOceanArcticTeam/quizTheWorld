/* eslint-disable import/extensions */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const keys = require('./keys');
const db = require('../../database/db.js');

// add the user to the db
const addGoogleUser = (info, callback) => {
  db.query(
    'INSERT INTO users(id, google_id, username, password,firstname,lastname,thumbnail_url,email) VALUES (DEFAULT, $1,$2,$3, $4, $5, $6, $7) RETURNING *;',
    // 'INSERT INTO users VALUES (DEFAULT, $1,$2,$3, $4, $5, $6, $7) RETURNING id;',
    [info.google_id,
      info.username,
      info.password,
      info.firstname,
      info.lastname,
      info.thumbnail_url,
      info.email],
    (err, data) => {
      // console.log('data returned', data);
      if (err) {
        throw err;
      } else {
        callback(data.rows[0].id);
        // console.log('done adding user');
      }
    },
  );
};

// TODO: make localCheck and googleCheck one function
// check the db for the user by email
const localCheck = async (email) => {
  // console.log('localCheck', email);
  const details = await db.query('SELECT * FROM users WHERE email = $1;', [email]);
  if (details.rows[0]) {
    return details.rows[0];
  }
  return false;
};

// check the db for the user by id
const idCheck = async (id) => {
  // console.log('idCheck', id);
  const details = await db.query('SELECT * FROM users WHERE id = $1;', [id]);
  if (details.rows[0]) {
    return details.rows[0];
  }
  return false;
};

// check the db for the user by google_id
const googleCheck = async (googleId) => {
  const details = await db.query('SELECT * FROM users WHERE google_id = $1;', [googleId]);
  if (details.rows[0]) {
    return details.rows[0];
  }
  return false;
};

// module.exports = function (passport) {
// LOCAL Strategy 26:50
passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, (username, password, done) => {
    // console.log('made it to local', username, password);
    // look u to see if there is already a user
    const checkUser = async () => {
      const user = await localCheck(username);
      // console.log('local user', user);
      if (user) {
        // user exists in the db check the password now after 'de'hashing it
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            // console.log('emailCheck', user);
            return done(null, user); // this should be the user obj
          }
          // password is incorrect
          return done(null, false);
        });
      } else {
        // no user exists
        done(null, false);
      }
    };
    checkUser();
  }),
);

passport.serializeUser((id, done) => {
  // console.log('serialize', id);
  done(null, id); // this might need to be just user not user.id
});

passport.deserializeUser(async (data, done) => { // id might need to be user  28:00
  // console.log('deserialize', data);
  let userData = data;
  if (userData.google_id) {
    userData = userData.id;
  }
  const user = await idCheck(userData); // this might need to be a conditional if google is used
  if (user) { // this might need to be user.id
    done(null, user); // might need to be id or data
  } else {
    done(null, null); // done(null, false) <-- try this
  }
});

passport.use(new GoogleStrategy({
  // options for the strategy
  // these are configured on mbolsen's developer console
  // callbackURL: 'http://localhost:3000/api/auth/google/redirect',
  callbackURL: 'https://quiz-knows.herokuapp.com/api/auth/google/redirect',
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
    // See if we have already confirmed that person as a user
  const checkUser = async () => {
    const user = await googleCheck(userInformation.google_id);
    if (user) {
      // user exists in the db
      done(null, user);
    } else {
      // need to save this user to the db
      addGoogleUser(userInformation, (id) => {
        done(null, id);
      });
    }
  };
  checkUser();
}));
// };
