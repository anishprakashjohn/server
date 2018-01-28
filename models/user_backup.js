const mongoose = require ('mongoose');
const validator = require('validator');
// {
//   email: 'anishprakashjohn@gmail.com'
//   password: encoded password
//   tokens: [{
//     access: 'auth',
//     token: 'aaaaaaaa'
//   }]
// }

var User = mongoose.model('User', {
  eMail: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    // validator: (value) =>{
    //    return validator.isEmail(value)
    // }
    validate: {
      validator: (value) => {
         return validator.isEmail(value);
      },
      message: '{VALUE} is not a valid eMail'
    }
  },
  password:{
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

module.exports = { User };
