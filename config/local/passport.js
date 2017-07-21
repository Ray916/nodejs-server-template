var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user');

module.exports = function(passport){

	passport.use('local', new LocalStrategy(
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
		}
	));

	passport.serializeUser(function(user, done){
		done(null, user);   //可以通过数据库方式操作
	});

	passport.deserializeUser(function(user, done){
		done(null, user);
	});
}


