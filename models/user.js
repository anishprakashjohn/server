var mongoose = require ('mongoose');
var user = mongoose.model('User', {
  eMail: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

module.exports = { user };
