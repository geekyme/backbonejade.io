
/**
 * Module dependencies.
 */
var everyauth = require('everyauth');
var express = require('express');
var _ = require('underscore');
app = express(); //global

// Database --- You typically won't find this kind of implementation in a real app. This is just for convenience.
app.db = [
    {
        id:'12133',
        name:"Shawn Lim",
        occupation: "coder"
    },
    {
        id:'ab12h1',
        name:"Jevon",
        occupation: "analyst"
    },
    {
        id:'nhk1209',
        name:"Howard",
        occupation:"comedian"
    }
];
//----------------------------------------

var backboneio = require('backbone.io');
var server = require('http').createServer(app);
var backend = backboneio.createBackend();
backend.use('update', 'read', function(req, res, next) {
    // My pseudo database update query
    // 1: look for the model in the database
    var o = _.find(app.db, function(obj){
        return obj.id === req.model.id;
      }
    );
    var i = app.db.indexOf(o);
    // 2: update the model
    if(i > -1) app.db[i] = req.model;
    // -------------------------------
    next();
});

backend.create(function(req, res) {
    // My pseudo database update query
    // 1: add the model to the DB. generate a unique id.
    req.model.id = new Date()*Math.random();
    app.db.push(req.model);
    backend.emit('created', req.model);
    // -------------------------------
});

backend.delete(function(req, res) {
    // My pseudo database update query
    // 1: add the model to the DB. generate a unique id.
     var o = _.find(app.db, function(obj){
        return obj.id === req.model.id;
      }
    );
    var i = app.db.indexOf(o);
    // 2: update the model
    if(i > -1) app.db.splice(i,1);
    backend.emit('deleted', req.model);
    // -------------------------------
});


backboneio.listen(server, { superman: backend });

// Configuration

app.configure(function(){
  app.set('port', process.env.PORT || 8080)
  app.set('views', __dirname + '/views');
  app.use(express.favicon() || express.favicon(__dirname + '/public/img/favicon.ico'));
  app.set('view engine', 'jade');
  app.set('view options', { doctype : 'html', pretty : true });
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(express.bodyParser());
  app.use(express.cookieParser('zee code!'));
  app.use(express.session({key: 'shawn.sid', secret: 'shawn nwahs'}));  
  app.use(express.methodOverride());
  app.use(everyauth.middleware(app));  
  app.use(express.static(__dirname + '/public'));  
  app.use(app.router);    
  app.use(function(err, req, res, next){
    // logic
    console.error(err);
    res.send(400, 'Ouch! Something went wrong. We\'ve been notified of the error! Redirecting you to homepage. <script>setInterval(function(){window.location.href="/"},3000)</script>');
  });  
});

app.root = __dirname

// Routes
require('./router')(app);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});
