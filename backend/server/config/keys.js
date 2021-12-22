// this file needs to be added to .gitignore

module.exports = {
  google: {
    clientID: process.env.GOOGLE_API_KEY,
    clientSecret: process.send.CLIENTSECRET,
  },
  session: {
    cookieKey: process.env.cookieKey, // this is just a random string that will help encrypt
  },
};
