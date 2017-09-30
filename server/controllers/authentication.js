const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

// Return a tocken for the user
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.jwt_secret);
}

exports.signin = (req, res, next) => {
  // User has already had their username and password auth'd we just need
  // to give them a token
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  if (!email || !username || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide email, username and password' });
  }
  // See if a user with the given email exists
  User.findOne({ email: email }, (err, existingUser) => {
    if (err) return next(err);

    // if a user with email does exist, return Error (422) -> unprocesable entity
    if (existingUser) {
      return res.status(422).send({ error: 'Email already taken' });
    }

    // If a user with email does NOT exists, create and save user record
    const user = new User({
      email: email,
      username: username,
      password: password
    });

    user.save(err => {
      if (err) return next(err);

      // respongo to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });
  });
};
