require('./config/config.js');

const _=require('lodash');
const express = require('express');
const bodyParser = require ('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require ('./db/mongoose.js');
var {DocumentHub} = require ('./models/documentHub.js');
var {User} = require ('./models/user.js');
// var {authenticate} = require('./middleware/authenticate');

var app  = express ();
const port = process.env.PORT;

app.use(bodyParser.json());

//POST DOC HUB
app.post('/documentHub', (req,res)=>{
  var newDocumentHub = new DocumentHub({
    formName: req.body.formName
  });

  newDocumentHub.save().then((doc)=>{
    res.send(doc);
  }, (e)=>{
    res.status(400).send(e);
  });
});

//GET DOC HUBS

app.get('/documentHub', (req,res)=>{
  DocumentHub.find().then((documentHubs)=>{
    res.send({documentHubs});
  },(e)=>{
    res.status(400).send(e);
  })

})

//GET DOC HUB OBJECT BY ID

app.get('/documentHub/:id',(req,res)=>{
  var id=req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

    DocumentHub.findById(id).then((documentHubs)=>{
      if(!documentHubs){
        return res.status(404).send();
      }
        res.send({documentHubs})
    }).catch((e)=>{
      res.status(400).send();
    });


});
//Delete DocumentHub
app.delete('/documentHub/:id',(req,res)=> {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  DocumentHub.findByIdAndRemove(id).then((documentHubs)=> {
    if(!documentHubs){
      return res.status(404).send();
    }
    res.send({documentHubs})

  }).catch((e)=> {
    res.status(400).send();
  });

});

//Update DOCUMENT HUB Details

app.patch('/documentHub/:id',(req,res)=>{
  var id=req.params.id;

  var body=_.pick(req.body,['formName','[completed]']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  DocumentHub.findByIdAndUpdate(id, {$set: body}, {new: true}).then((documentHubs)=>{
    if(!documentHubs){
      return res.status(404).send();
    }
    res.send({documentHubs});
  }).catch((e)=>{

      return res.status(400).send();
  });
});

//POST /USER
app.post('/users', (req,res)=>{
  var body=_.pick(req.body, ['eMail','password']);
  var user = new User(body);

  user.save().then(()=>{
    // res.send(doc);
      return user.generateAuthToken();

  }). then((token)=>{
    res.header('x-auth',token).send(user);
  }).catch ((e)=>{

    res.status(400).send(e);
  });
});

var authenticate = (req,res, next) =>{
  var token = req.header('x-auth');
  User.findByToken(token).then((user)=>{
    if(!user){
      return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next();
  }).catch((e) =>{
    res.status(401).send();
  });
};
//AUTHENTICATE USERS
app.get('/users/me',authenticate, (req,res)=>{
  res.send(req.user);
});

//POST USER LOGIN

app.post('/users/login', (req,res)=>{
  var body=_.pick(req.body, ['eMail','password']);
  var user = new User(body);
  User.findByCredentials(body.eMail, body.password).then((user)=>{
     return user.generateAuthToken().then((token) => {
       res.header('x-auth',token).send(user);
     });
  }).catch((e)=>{
    res.status(400).send();
  });
});

app.listen(3000, () =>{
  console.log(`Started on port 3000`);
});

module.exports = {app};
