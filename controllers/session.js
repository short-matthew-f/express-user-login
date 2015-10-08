var express = require('express'),
    router  = express.Router(),
    User    = require('../models/user');

router.get('/new', function (req, res) {
  res.render('session/new');
});

router.post('/', function (req, res) {

});

router.delete('/', function (req, res) {

});
