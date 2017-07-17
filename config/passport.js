var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport){

	passport.use('local', new LocalStrategy(
	function(username, password, done){
		console.log(username + "  " + password);
		var user = {
			id: '1',
			username: 'admin',
			password: 'pass'
		};  //// 可以配置通过数据库方式读取登陆账号

		if(username != user.username){
			return done(null, false, {message: 'Incorrect username'});
		}
		if(password != user.password){
			return done(null, false, {message: 'Incorrect password'});
		}
		return done(null, user);
	}
	));

	//保存user对象
	passport.serializeUser(function(user, done){
		done(null, user);   //可以通过数据库方式操作
	});

	//删除user对象
	passport.deserializeUser(function(user, done){
		done(null, user);
	});
}


