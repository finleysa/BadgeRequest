const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 'admin';
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const assert = require("assert")
// Database Name
const dbName = 'riti';
 
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
 
  const db = client.db(dbName);
  const collection = db.collection('users');

  collection.findOne({username: "admin"}, function(err, user) {
    bcrypt.compare(myPlaintextPassword, user.password).then(function(res) {
        console.log(res);
    });
  })
});