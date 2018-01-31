const {SHA256} = require ('crypto-js');
const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcryptjs');

var password = 'password';
var hashpassword ='';
// bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash("B4c0/\/", salt, function(err, hash) {
//         hashpassword = hash;
//         console.log(`i am here ${hash}`);
//     });
// })
var hashpassword ='$2a$10$eIGeDuhHqYz5Vg2MS1F7MezSpiVgfaXVZC2G7evb4Nb02pri9P/Ka';
bcrypt.compare("B4c0/\/", hashpassword, function(err, res) {
    console.log(res);
    console.log(`i am here123 ${hashpassword}`);
});


// var hashpassword='2a$10$9DNOIFCtGyJn/h5rnKmxv.SNxxy3ulOcX7TdufQKgjCWOnjfx2hxK';


// var message = 'I am user number 3';
// var hash=SHA256(message).toString();
//
// var data = {
//   id: 10
// }
// var token = jwt.sign(data, '123abc');
// console.log(token);
//
// var decoded=jwt.verify(token, '123abc');
// console.log('decoded',decoded)

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//   id: 4
// }
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// // token.data.id=5
// // token.hash = SHA256(JSON.stringify(data)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data)+'somesecret').toString();
// if(resultHash==token.hash){
//   console.log('Data was not changed');
// }
// else{
//   console.log('Data was changed. Do not trust!!!')
// }
