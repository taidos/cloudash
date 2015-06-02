var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

var insertUser = function(db, callback) {
  db.collection('users').insertOne({
    'auth': {
      'username': 'admin',
      'password': '21232f297a57a5a743894a0e4a801fc3'
    },
    'about': {
      'name': 'ADMIN',
      'phone': '+000.000000000',
      'nif': '000000000'
    },
    'address': {
      'street': 'Constancia',
      'city': 'Constancia',
      'country': 'Portugal',
      'zip': '0000-00'
    },
    'details': {
      'created': '',
      'lastlogin': '',
      'lastip': ''
    },
    'type': 'admin',
    'status': 'active'
  }, function(err, result) {
    assert.equal(err, null);
    console.log("User Inserted into DB");
    callback(result);
  });
};

MongoClient.connect(process.env.CLOUDY_MONGODB, function(err, db) {
  assert.equal(null, err);
  insertUser(db, function() {
    db.close();
  });
});