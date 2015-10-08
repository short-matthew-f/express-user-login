var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var userSchema = new Schema({
  email: String,
  password: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;
