const {ObjectID} = require('mongodb');

const {mongoose} = require ('./../db/mongoose');
const {DocumentHub} = require('./../models/documentHub');

// DocumentHub.remove({}).then((result)=>{
//   console.log(result);
// });

// DocumentHub.findOneAndRemove

DocumentHub.findByIdAndRemove('5a6ae2b91c66f3d6e6daacde').then((docHub)=>{
   console.log(docHub);
});
