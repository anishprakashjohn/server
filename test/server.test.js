const expect = require ('expect');

const request = require ('supertest');
const {ObjectID} = require('mongodb');

const {app} = require ('./../server');
const {DocumentHub} = require ('./../models/documentHub');
const documentHubData= [{
  _id: new ObjectID(),
  formName: 'First test demo'
},{
  _id: new ObjectID(),
  formName: 'First test demo'
}];

beforeEach((done)=>{
  DocumentHub.remove({}).then(()=>{
    return DocumentHub.insertMany(documentHubData)
  }).then (()=> done ());
});



describe ('POST/documentHub',() =>{
  it('should create a documentHub dealing',(done)=>{
      var formName = 'Test Case 1 dealing Type';


      request(app)
      .post('/documentHub')
      .send({formName})
      .expect(200)
      .expect((res)=>{
        expect(res.body.formName).toBe(formName);
      })
      .end((err,res)=>{
        if(err){
          return done(err);
        }
        DocumentHub.find({formName}).then((documentHubs)=>{
          expect(documentHubs.length).toBe(1);
          expect(documentHubs[0].formName).toBe(formName);
          done();
      }).catch((e)=>{
        done(e);
      });
  });
});
 it('should not create document Hub dealing with invalid body data', (done) =>{
   request(app)
   .post('/documentHub')
   .send({})
   .expect(400)
   .end((err,res)=>{
     if (err){
       return done(err);
     }

     DocumentHub.find().then((documentHubs) =>{
       expect(documentHubs.length).toBe(2);
       done();

     }).catch((e)=>
       done(e));
   });
 });
});


describe ('GET/documentHub details',()=>{
  it('should get all todos',(done)=>{
    request(app)
    .get('/documentHub')
    .expect(200)
    .expect((res)=>{
      expect(res.body.documentHubs.length).toBe(2);
    })
    .end(done);
  });
});

describe('GET /DocumentHub/:id',()=>{
  it('should return todo doc',(done)=>{
    request(app)
    .get(`/documentHub/${documentHubData[0]._id.toHexString()}`)
    .expect(200)
    .expect ((res)=>{
      expect(res.body.documentHubs.formName).toBe(documentHubData[0].formName);
    }).end (done);
  });

it('shoud return 404 if document Hub not found', (done)=>{
  var idTest = new ObjectID().toHexString;
  request(app)
  .get(`/documentHub/${idTest}`)
  .expect(404)
  .end (done);

});

it('shoud return 404 if document Hub not found', (done)=>{
  var idTest = new ObjectID();
  request(app)
  .get(`/documentHub/1234`)
  .expect(404)
  .end (done);

});
});

describe('DELETE/DocumentHub/:id', ()=>{
  it('should delete Documenth HUb', (done)=>{
    var idHex=documentHubData[0]._id.toHexString();

    request(app)
    .delete(`/documentHub/${idHex}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.documentHubs._id).toBe(idHex);
    }).end((err,res)=>{
      if(err){
        return done(err);
      }
      DocumentHub.find().then((documentHubs)=>{
        expect(documentHubs.length).toBe(1);
        done();
    }).catch((e)=> done(e));



});


});
it('shoud return 404 if document Hub not found', (done)=>{
  var idTest = new ObjectID().toHexString;
  request(app)
  .delete(`/documentHub/${idTest}`)
  .expect(404)
  .end (done);

});

it('shoud return 404 if document Hub not found', (done)=>{
  var idTest = new ObjectID();
  request(app)
  .delete(`/documentHub/1234`)
  .expect(404)
  .end (done);

});
});
describe('PATCH/DocumentHub/:id', ()=>{
  it('should update DocumentHub', (done)=>{
    var idHex=documentHubData[0]._id.toHexString();
    var updatedFormName= 'New test demo';

    request(app)
    .patch(`/documentHub/${idHex}`)
    .send({formName:updatedFormName})
    .expect(200)
    .expect((res)=>{
      expect(res.body.documentHubs.formName).toBe(updatedFormName);
    }).end((err,res)=>{
      if(err){
        return done(err);
      }
      DocumentHub.findById(idHex).then((documentHubs)=>{
        expect(documentHubs.formName).toBe(updatedFormName);
        done();
    }).catch((e)=> done(e));



});

});
});
