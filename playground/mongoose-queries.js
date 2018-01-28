
const {ObjectID} = require('mongodb');

const {mongoose} = require ('./../db/mongoose');
const {DocumentHub} = require('./../models/documentHub');

var id = '5a6ac6b858142138c71a573b';
// if(!ObjectID.isvalid(id)){
//   console.log('ID not valid');
// }

// DocumentHub.find({
//   formName: 'First test demo'
// }).then((documentH)=>{
//   console.log(documentH);
// });

// DocumentHub.findOne({
//   formName: 'First test demo'
// }).then((documentH)=>{
//   console.log(documentH);
// });

DocumentHub.findById(id).then((todo)=>{
  if(!todo){
    return console.log('ID not found');
  }
  console.log('Todo By Id',todo);
}).catch ((e) => console.log(e));
