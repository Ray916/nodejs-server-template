var express = require('express'),
	http = require('http'),
	path = require('path'),
	passport = require('passport'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	methodOverride = require('method-override'),
	mongoose = require('mongoose');

var app =express();
//设置handlebars视图引擎
var handlebars = require('express-handlebars')
						.create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use(session({resave: true, 
				saveUninitialized: true,
				secret: 'xuezw-test', 
				cookie: { maxAge: 60000 }}));
app.use(passport.initialize());
app.use(passport.session());

//设置使用express默认的图标
//如果要使用自己的图标
//app.use(favicon(__dirname + '/public/img/favicon.ico'));


//在开发环境下使用，在终端显示简单的不同颜色的日志
app.use(logger('dev'));

//用来解析请求体，支持 application/json， application/x-www-form-urlencoded, 和 multipart/form-data
app.use(bodyParser.json()); //解析JSON格式的post参数
app.use(bodyParser.urlencoded({ extended: false })); //解析urlencoeded编码的post参数，URLEncoded编码中,所有的字符均为ANSCII码

//协助处理 POST 请求，伪装 PUT、DELETE 和其他 HTTP 方法
app.use(methodOverride());

//设置静态资源访问
app.use(express.static(__dirname + '/public'));

//禁用x-powered-by
app.disable('x-powered-by');

//端口设置
app.set('port', process.env.PORT || 3000);

//开发环境下的错误处理，输出错误信息
if('development' == app.get('dev')){
	app.use(express.errorHandler());
}

//mongodb
mongoose.connect('mongodb://localhost/nodejs',{useMongoClient:true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
    console.log('mongidb connected !');
});

//passport设置
require('./config/passport')(passport);

//路由
require('./routes/route')(app, passport);

//端口监听
app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + 
		app.get('port') + '; press Ctrl-C to terminate.');
});