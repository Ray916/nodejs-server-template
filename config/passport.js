var local = require('./local/local');

module.exports = function(passport){
	
	passport.serializeUser(function(user, done){
		done(null, user);   //可以通过数据库方式操作
	});
	passport.deserializeUser(function(user, done){
		done(null, user);
	});

	//使用本地认证策略
	passport.use('local', local);
}


