// users.js
// Routes to CRUD users.

// GET / 
exports.allusers = function(req, res, next){
    // we pass the database results to the JADE -- bootstrap data into Backbone Collection
    res.render('users',{title:"Backbone Jade on socket.io", usersData:app.db});
};
