const server = require("express").Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User, Cliente } = require("../db");
const { Pool } = require('pg');
var session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const pg = require('pg');
const jwt = require('jsonwebtoken');

const pgPool = new pg.Pool({
    // Insert pool options here
});


const conPool = new Pool({
host: 'localhost',
user: process.env['DB_USER'],
password: process.env['DB_PASSWORD'],
database: process.env['DB_NAME'],
max: 10,
idleTimeoutMillis: 60000,
connectionTimeoutMillis: 6000,
})


// How Passport works 
// https://medium.com/@prashantramnyc/node-js-with-passport-authentication-simplified-76ca65ee91e5
passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: '/oauth2/redirect/google'
  },
  function(accessToken, refreshToken, profile, cb) {
    
    Cliente.findOrCreate({ 
        where: {
          googleId: profile.id
        },
        defaults: {
          Usuario: profile.displayName,
          Nombre: profile.name.givenName,
          Apellido: profile.name.familyName,
        }
      })
      .then((user) => cb(null, user))
      .catch((err) => cb(err, null))
  }
));

server.use(session({
  store: new PgSession({
    pool: conPool,
    tableName: 'Sessions'
  }),
  secret: process.env['SECRET_PASSPORT_SESSION'],
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

server.use(passport.authenticate('session'));

// serializing the user to store data in the session (to persist user data after sucessfull authentication)
// we store all data passed in the second argument of the cb function
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});
// The result of the serializeUser method is attached to the 
// session as req.session.passport.user = {}

//The first argument of deserializeUser corresponds to the key of the user object that was given to the done function 
// In deserializeUser that key is matched with the in memory array / database or any data resource.
// So your whole object is retrieved with help of that key.
// https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
passport.deserializeUser((id, done) => {
  Cliente.findOne(id)
    .then(user => done(null, user))
    .catch(err => done(err));
});

server.get('/auth/google',  passport.authenticate('google', { scope: ['profile'] }));


server.get('/oauth2/redirect/google', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {

    //Generating a jsonwebtoken
    //jwt.sign(payload, secretOrPrivateKey, [options, callback])
    const token = jwt.sign({ data: req.user },process.env['SECRET_JWT_TOKEN'], { expiresIn: '1h' });
    
    console.log(token);
    console.log("Usuario Google Auth" + JSON.stringify(req.user))
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000/tamauto?token='+token);
  });

server.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/deslogeado');
  });
});

module.exports =  server;

module.exports = {
    auth: server
}