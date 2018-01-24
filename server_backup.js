var mongoose = require ('mongoose');

mongoose.Promise  = global.Promise;
mongoose.connect('mongodb://localhost:27017/DocumentHub');

//save new
var DocumentHub = mongoose.model('DocumentHub', {
  formName: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  act:{
    type: String
  },
  section: {
    type: String
  },
  supportingDocument:{
    type: String
  },
  imageInstrument: {
    type: String
  }
});

var newDocumentHub = new DocumentHub({
  formName: '  TRANSFER OF LAND TO THE QUEEN ',
  act: 'Transfer of Land Act',
  section: '45',
  imageInstrument: 'optional'

});

newDocumentHub.save().then((doc) => {
      console.log(doc);
}, (e) =>{
  console.log('Unable to save DocumentHub');
});
