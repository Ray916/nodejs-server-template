var mongoose = require('mongoose');
var User = require('../models/user.js');

mongoose.connect('mongodb://localhost/nodejs',{useMongoClient:true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
    console.log('mongodb connected !');
});


var user1 = new User();
user1.username = "admin";
user1.password = user1.encryptPassword("pass123");
console.log(user1);

User.create(user1, function(err, user1){
    if(err) return console.error(err);
});

//User.find({username: "admin"}, function(err, user){
  //  if(err) return console.error(err);
  //  console.log(user);
//});