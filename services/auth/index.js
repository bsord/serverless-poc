const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs-then');

const connectToDatabase = require('./db');
const User = require('./models/user');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
  "Content-Type": "application/json"
}

/* 
 * Functions
 */

module.exports.login = (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(() =>
      login(JSON.parse(event.body))
    )
    .then(session => ({
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(session)
    }))
    .catch(err => {
      console.log(err)
      return({
        statusCode: err.statusCode || 500,
        headers: headers,
        body: JSON.stringify({ stack: err.stack, message: err.message })
      })
    });
};

module.exports.register = (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(() =>
      register(JSON.parse(event.body))
    )
    .then(session => ({
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(session)
    }))
    .catch(err => {
      console.log(err)
      return {
        statusCode: err.statusCode || 500,
        headers: headers,
        body: JSON.stringify({ stack: err.stack, message: err.message })
      }
    });
};

module.exports.me = (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(() =>
      me(event.requestContext.authorizer.principalId)
    )
    .then(session => ({
      statusCode: 200,
      headers: headers,
      body: session
    }))
    .catch(err => {
      console.log(err)
      return {
        statusCode: err.statusCode || 500,
        headers: headers,
        body: JSON.stringify({ stack: err.stack, message: err.message })
      }
    });
};

// AWS AUTHORIZER FUNCTION THAT RETURNS AN ACCESS POLICY FOR THE API
module.exports.verify_token = (event, context, callback) => {

  // check header or url parameters or post parameters for token
  const token = event.authorizationToken;

  if (!token)
    return callback(null, 'Unauthorized');

  // verifies secret and checks exp
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return callback(null, 'Unauthorized');

    // if everything is good, save to request for use in other routes
    return callback(null, generatePolicy(decoded.id, 'Allow', event.methodArn))
  });

};

/**
 * Helpers
 */

// Policy helper function
const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
}

function signToken(id) {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: 86400 // expires in 24 hours
  });
}

function checkIfInputIsValid(eventBody) {
  if (
    !(eventBody.password &&
      eventBody.password.length >= 7)
  ) {
    return Promise.reject(new Error('Password error. Password needs to be longer than 8 characters.'));
  }

  if (
    !(eventBody.name &&
      eventBody.name.length > 5 &&
      typeof eventBody.name === 'string')
  ) return Promise.reject(new Error('Username error. Username needs to be longer than 5 characters'));

  if (
    !(eventBody.email &&
      typeof eventBody.name === 'string')
  ) return Promise.reject(new Error('Email error. Email must have valid characters.'));

  return Promise.resolve();
}

function register(eventBody) {
  return checkIfInputIsValid(eventBody) // validate input
    .then(() =>
      User.findOne({ email: eventBody.email }) // check if user exists
    )
    .then(user =>
      user
        ? Promise.reject(new Error('User with that email exists.'))
        : eventBody.password
    )
    .then(password =>
      User.create({ name: eventBody.name, email: eventBody.email, password: password }) // create the new user
    )
    .then(user => ({ auth: true, token: signToken(user._id) })); // sign the token and send it back
}

function login(eventBody) {
  return User.findOne({ email: eventBody.email })
    .then(user =>
      !user
        ? Promise.reject(new Error('User with that email does not exits.'))
        : comparePassword(eventBody.password, user.password, user._id)
    )
    .then(token => ({ auth: true, token: token }));
}

function comparePassword(eventPassword, userPassword, userId) {
  console.log(eventPassword, userPassword)
  return bcrypt.compare(eventPassword, userPassword)
    .then(passwordIsValid =>
      !passwordIsValid
        ? Promise.reject(new Error('The credentials do not match.'))
        : signToken(userId)
    );
}

function me(userId) {
  return User.findById(userId, { password: 0 })
    .then(user =>
      !user
        ? Promise.reject('No user found.')
        : user
    )
    .catch(err => Promise.reject(new Error(err)));
}