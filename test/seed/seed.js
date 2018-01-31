
const {ObjectID} = require('mongodb');
const {DocumentHub} = require ('./../../models/documentHub');
const {User} = require ('./../../models/user');
const jwt = require('jsonwebtoken');

const documentHubData= [{
  _id: new ObjectID(),
  formName: 'First test demo'
},{
  _id: new ObjectID(),
  formName: 'First test demo'
}];

const populateDocHub = (done)=>{
  DocumentHub.remove({}).then(()=>{
    return DocumentHub.insertMany(documentHubData)
  }).then (()=> done ());
};
const userOneID = new ObjectID();
const userTwoID = new ObjectID();
const users = [{
  _id: userOneID,
  eMail: 'anishprakashjohn@gmail.com',
  password: 'anish007',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneID, access: 'auth'}, 'abc123').toString()

  }]
},{
  _id: userTwoID,
  eMail: 'anishprakashjohn1@gmail.com',
  password: 'anish007'
}];

const populateUsers = (done)=>{
  User.remove({}).then(()=>{
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])}).then(()=>{
    done()
  });
};
module.exports = {documentHubData, populateDocHub,users, populateUsers};
