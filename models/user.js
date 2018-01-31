const mongoose = require ('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs')
// {
//   email: 'anishprakashjohn@gmail.com'
//   password: encoded password
//   tokens: [{
//     access: 'auth',
//     token: 'aaaaaaaa'
//   }]
// }
var UserSchema = new mongoose.Schema ({
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
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['_id','eMail']);
}

UserSchema.methods.generateAuthToken = function () {
   var user = this;
   var access = 'auth';
   var token = jwt.sign({_id: user._id.toHexString(),
                          access: access}, 'abc123').toString();
   user.tokens.push ({
     access,
     token
   });

   return user.save().then(() => {
     return token;
   });

};

UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;
  try {
    decoded = jwt.verify (token, 'abc123');

  }catch  (e){
    // return new Promise((resolve, reject)=>{
    //   reject();
    //   });
    return Promise.reject();
  }
  var userFind =  User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'

  });

  return userFind;
};

UserSchema.pre('save', function (next){
  var user = this;
  if(user.isModified('password')){
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash){
            user.password = hash;
            next();
        });
    })
  }else{
    next();
  }
});

UserSchema.statics.findByCredentials = function (eMail, password){
  var user = this;
  return User.findOne({eMail}).then((user)=>{
    if(!user){
      return Promise.reject();
    }
    return new Promise((resolve,reject)=> {
      //User bcrypt compare to compare password and user.password
      bcrypt.compare(password, user.password, function(err, res) {
          if(res){
            resolve(user);
          }
          else{
            reject();
          }
      });
    });

  });
};


var User = mongoose.model('User', UserSchema);

module.exports = { User };
