/* import necessary libraries */
var mongoose = require('mongoose'),
    server   = require('./lib/create-server')();

/* set universal constants */
var MONGOURI = process.env.mongouri || "mongodb://localhost/user-login-demo",
    PORT     = process.env.port || 3000;

/* include routers for specific routes */
server.use('/session', require('./controllers/session'));
server.use('/users', require('./controllers/users'));

/* define other routes */
server.get('/', function (req, res) {
  res.render('welcome');
});

/* spin it up */
mongoose.connect(MONGOURI);
server.listen(PORT, function () {
  console.log("I'm up on port", PORT);
});
