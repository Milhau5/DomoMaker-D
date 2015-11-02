var models = require('../models');

var Account = models.Account;

var loginPage = function(req, res) {
  res.render('login', { csrfToken: req.csrfToken() }); //first make login page to render
};

var signupPage = function(req, res) {
  res.render('signup', { csrfToken: req.csrfToken() }); //first make signup page to render
};

var newPage = function(req, res) {
  res.render('new', { title: "Hello " + req.body.username, csrfToken: req.csrfToken() });
};

var logout = function(req, res) {
  req.session.destroy();
  res.redirect('/');
};

var login = function(req, res) {
  if(!req.body.username || !req.body.pass) {
    return res.status(400).json({error: "RAWR! All fields are required"}); //return regular error
  }

  Account.AccountModel.authenticate(req.body.username, req.body.pass, function(err, account) {
    if(err || !account) {
      return res.status(401).json({error: "Wrong username or password"}); //return regular error
    }

    req.session.account = account.toAPI();

    res.json({redirect: '/maker'}); //choose new page to redirect to
  });
};

var signup = function(req, res) {

  if(!req.body.username || !req.body.pass || !req.body.pass2) {
    return res.status(400).json({error: "RAWR! All fields are required"}); //return regular error
  }

  if(req.body.pass !== req.body.pass2) {
    return res.status(400).json({error: "RAWR! Passwords do not match"}); //return regular error
  }

  Account.AccountModel.generateHash(req.body.pass, function(salt, hash) {

    var accountData = {
      username: req.body.username,
      salt: salt,
      password: hash
    };

    var newAccount = new Account.AccountModel(accountData);

    newAccount.save(function(err) {
      if(err) {
        console.log(err);
        return res.status(400).json({error: "An error occurred"}); //return regular error
      }

      req.session.account = newAccount.toAPI();

      res.json({redirect: '/maker'}); //choose new page to redirect to
    });
  });
};

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signupPage = signupPage;
module.exports.signup = signup;
module.exports.newPage = newPage;
