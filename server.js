var express = require('express'),
    server  = require('./lib/initialize')(express),
    PORT    = process.env.port || 3000,
    mongoose = require('mongoose'),
    MONGOURI = process.env.mongouri || "mongodb://localhost/user-login-demo";

server.get('/', function (req, res) {
  res.render('welcome');
});



mongoose.connect(MONGOURI);
server.listen(PORT, function () {
  console.log("I'm up on port", PORT);
});
