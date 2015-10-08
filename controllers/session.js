var express = require('express'),
    router  = express.Router(),
    User    = require('../models/user');

router.get('/new', function (req, res) {
  res.render('session/new');
});

router.post('/', function (req, res) {
  var userParams = req.body.user;

  User.findOne(userParams, function (err, user) {
    if (err) {
      req.session.flash.message = "Some error has occurred.";
      res.redirect(302, 'session/new');
    } else if (user) {
      req.session.userId = user._id;
      req.session.flash.message = "Thanks for signing in.";
      res.redirect(302, 'users/' + user._id);
    } else {
      req.session.flash.message = "Email and password combination does not exist / match.";
      res.redirect(302, 'session/new');
    }
  });
});

router.delete('/', function (req, res) {
  delete req.session.userId;

  req.session.flash.message = "Thanks for signing out.";
  res.redirect(302, '/session/new');
});

module.exports = router;
