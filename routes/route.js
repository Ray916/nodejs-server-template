var main = require('../handlers/mainHandler');
var user = require('../handlers/userHandler');
var fortune = require('../lib/fortune');

//路由信息
module.exports = function(app, passport){

	app.get('/', main.home);

	app.post('/login', 
	passport.authenticate('local',{
		successRedirect: '/users',
		failureRedirect: '/',
		failureFlash: true
	}));

	//需要认证登录的路由
	app.all('/users', isLoggedIn);
	app.get('/users',user.list);
	app.get('/about', function(req, res){
		res.render('about', {fortune: fortune.getFortune()});
	});

	//登出
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

	//定制404页面
	app.use(function(req, res){
		res.status(404);
		res.render('404');
	});

	//定制500页面
	app.use(function(err, req, res, next){
		console.error(err.stack);
		res.status(500);
		res.render('500');
	});
}

function isLoggedIn(req, res, next){
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}