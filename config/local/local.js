var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user');

//本地用户名密码登录认证策略
module.exports = new LocalStrategy(
		function(username, password, done){
			
			User.findOne({'username': username}, function(err, user){
				
				if(err || user === null){
					return done(null, false, {message: "用户名错误！"});
				}
				if(!user.validPassword(password)){
					return done(null, false, {message: "密码错误！"});
				}
				console.log("认证成功");
				return done(null, user);
			});
});