var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//schema
var userSchema = mongoose.Schema({
//     local: {
//         username: String,
//         password: String
//     },
//     weibo: {
//         id: String,
//         token: String,
//         name: String
//   }
 username: {type:String,required:true},
 password: {type:String,required:true}
});

userSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);
};


userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password,this.password);
};

//指定要连接的集合名字users
module.exports = mongoose.model('User', userSchema, "users");