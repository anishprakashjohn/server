var mongoose = require ('mongoose');

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

module.exports = { DocumentHub };
