var ejs            = require('ejs'),
    layouts        = require('express-ejs-layouts'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    session        = require('express-session');

module.exports = function (express) {
  var server = express();

  server.set('views', './views');
  server.set('view engine', 'ejs');

  server.use(session({
    secret: "someFancySecret",
    resave: false,
    saveUninitialized: true
  }));

  server.use(function (req, res, next) {
    res.locals.flash  = req.session.flash || {};
    req.session.flash = {};
    next();
  });

  server.use(express.static('./public'));
  server.use(layouts);
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(methodOverride('_method'));

  return server;
};
