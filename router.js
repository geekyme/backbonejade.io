var routes = require('./routes');

module.exports = function(app){
	//routes for home
	app.get('/', routes.users.allusers);
}

