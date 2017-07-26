var WeiboStrategy = require('passport-weibo').Strategy;

var weiboAuth = {
        'appkey': '',
        'secret': '',
        'oauth_callback_url':''
    }

//新浪认证策略
module.exports = new WeiboStrategy({
		clientID: weiboAuth.appkey,
		clientSecret: weiboAuth.secret,
		callbackURL: weiboAuth.oauth_callback_url,
		passReqToCallback: true
	}, function(req, token, refreshToken, profile, done){   

		process.nextTick(function(){
			if(!req.user){
				User.findOne({'weibo.id': profile.id}, function(err, user){
					if(err){
						return done(err);
					}

					if(user){
						if(!user.weibo.token){
							user.weibo.token = token;
							user.weibo.name = profile.name;

							user.save(function(err){
								if(err){
									throw err;
								}
								return done(null, user);
							});
						}

						return done(null, user);
					}else{
						var newUser = new User();

						newUser.weibo.id = profile.id;
						newUser.weibo.token = token;
						newUser.weibo.name = profile.displayName;

						newUser.save(function(err){
							if(err){
								throw err;
							}
							return done(null, user);
						});
					}
				});
			}else{
				var user = req.user;

				user.weibo.id = profile.id;
				user.weibo.token = token;
				user.weibo.name = profile.displayName;

				user.save(function(err){
					if(err){
						throw err;
					}
					return done(null, user);
				});
			}
		});
    });
