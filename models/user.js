var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var userSchema = new Schema({
  email: String,
  password: String
});

/* Using userSchema.statics allow create a class method called
 * User.findByEmailOrCreate.  I'm making it so that the callback
 * will need to be of the form function(err, user), as normal
 */
userSchema.statics.findOrCreateByEmail = function (params, callback) {
  this.findOne({
    email: params.email
  }, function (err, user) {
    if (err) {
      callback(err, null);
    } else if (user) {
      callback(null, user);
    } else {
      this.model.create(params, callback);
    }
  });
};

var User = mongoose.model('User', userSchema);

module.exports = User;
