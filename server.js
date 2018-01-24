var express = require('express');
var bodyParser = require ('body-parser');

var {mongoose} = require ('./db/mongoose.js');
var {DocumentHub} = require ('./models/documentHub.js');
var {user} = require ('./models/user.js');

// var newDocumentHub = new DocumentHub({
//   formName: '  TRANSFER OF LAND TO THE QUEEN ',
//   act: 'Transfer of Land Act',
//   section: '45',
//   imageInstrument: 'optional'
//
// });
//
// newDocumentHub.save().then((doc) => {
//       console.log(doc);
// }, (e) =>{
//   console.log('Unable to save DocumentHub');
// });

var app  = express ();

app.use(bodyParser.json());


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

//GET

app.listen(3000, () =>{
  console.log('Started on port 3000');
});
