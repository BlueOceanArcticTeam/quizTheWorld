/* eslint-disable import/extensions */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const db = require('../../database/db.js');

// check the db for the user by google_id
const googleCheck = async (googleId) => {
  const details = await db.query('SELECT * FROM users WHERE google_id = $1;', [googleId]);
  if (details.rows[0]) {
    return details.rows[0];
  }
  return false;
};

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
      console.log('data returned', data);
      if (err) {
        throw err;
      } else {
        callback(data.rows[0].id);
        // console.log('done adding user');
      }
    },
  );
};

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (data, done) => {
  // console.log('data.rows', data);
  if (data.id) {
    // console.log('userid:', data.id);
    // const userDbInformation = await db.query('SELECT * FROM users WHERE id=$1', [data.id]);
    // console.log('deserialize', userDbInformation);
    // const { id } = data;
    // const {
    //   email, firstname, google_id, lastname, password, thumbnail_url, username, ...data
    // } = data;
    // console.log('IANs data', data);
    done(null, data);
  } else {
    done(null, null);
  }
});

passport.use(new GoogleStrategy({
  // options for the strategy
  // these are configured on mbolsen's developer console
  callbackURL: 'http://localhost:3000/api/auth/google/redirect',
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
      // console.log('user exists', user.id);
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
