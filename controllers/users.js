var express = require('express'),
    router  = express.Router(),
    User    = require('../models/user');

router.get('/new', function (req, res) {
  res.render('users/new');
});

router.get('/:id', function (req, res) {
  if (req.session.userId === req.params.id) {
    User.findById(req.params.id, function (err, user) {
      if (err) {
        req.session.flash.message = "An error has occurred.";
        res.redirect(302, '/');
      } else if (user) {
        res.render('users/show', {user: user});
      } else {
        res.redirect(302, '/');
      }
    });
  } else if (req.session.userId) {
    req.session.flash.message = "You cannot view that user's page.";
    res.redirect(302, '/users/' + req.session.userId);
  } else {
    req.session.flash.message = "You must be logged in to see this.";
    res.redirect(302, '/session/new');
  }
});

router.post('/', function (req, res) {
  var userParams = req.body.user;

  if (!userParams.email) {
    req.session.flash.message = "Email cannot be empty.";
    res.redirect(302, '/users/new');
  } else if (!userParams.password) {
    req.session.flash.message = "Password cannot be empty.";
    res.redirect(302, '/users/new');
  } else if (passwordIsVerified(userParams)) {
    delete userParams.passwordVerification;

    User.findOrCreateByEmail(userParams, function (err, user) {
      if (err) {
        console.log(err);
        req.session.flash.message = "Some error has occurred.";
        res.redirect(302, '/users/new');
      } else {
        req.session.flash.message = "Sign up successful!";
        res.redirect(302, '/session/new');
      }
    });
  } else {
    req.session.flash.message = "Password and verification must match.";
    res.redirect(302, '/users/new');
  }
});

function passwordIsVerified (userParams) {
  return !!userParams.password &&
         (userParams.password === userParams.passwordVerification);
}

module.exports = router;
