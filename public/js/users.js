$(function(){
	Backbone.io.connect();
	//--------the App Super View -------------------//
	//instantiate on view creation
	App = new (Backbone.View.extend({
		Models:{},
		Views:{},
		Collections:{},		
		template:_.template('<form style="margin-top:50px;"><input type="text" name="name" placeholder="name" required /><br><input type="text" placeholder="occupation" name="occupation" required /><br><button class="btn btn-primary">Create</button></form><hr>'),
		initialize: function(){
			this.render();
		},
		render: function(){
			this.$el.html(this.template());
		},
		events: {
			"submit":"createUser"
		},
		createUser: function(e){
			e.preventDefault();
			users.create({
				"name": this.$('input[name=name]').val(),
				"occupation": this.$('input[name=occupation]').val(),
			}, {wait: true});
		}
	}))({el:$('#content')});

	//--------the User Model Views and Collections-----------//
	//Models ------- GLOBAL
	App.Models.User = Backbone.Model.extend({
		h3change: function(){
			this.set({name:'I have became Superman'});
			this.save();
		}
	})

	//Views ------- GLOBAL
	App.Views.UserView = Backbone.View.extend({
		className: 'thumbnail',
		events:{
			"click h3":"h3change",
			"click .btn-danger": "removeUser"
		},
		removeUser: function(){
			this.model.destroy();
		},
		h3change: function(e){
			this.model.h3change();
		},
		template: _.template("<img src='' height='100' width='100'><h3><%= name %></h3><p><%= occupation %></p><p><button class='btn btn-danger'>remove</p>"),
		duster: function(modelJSON){
			var buildingTemplate = dust.compile("<img src='' height='100' width='100'><h3>{name}</h3><p>{occupation}</p><p><button class='btn btn-danger'>remove</p>","building");
			dust.loadSource(buildingTemplate);
			var result;
			dust.render("building", modelJSON, function(err, out){
				result = out;
			});
			return result;
		},
		initialize:function(){
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy remove', this.remove);
			this.render();
		},
		render:function(){
			this.$el.html(this.duster(this.model.attributes));
			return this;
		}
	})

	//Collection -------- GLOBAL
	App.Collections.Users = Backbone.Collection.extend({
		initialize: function(){
			this.bindBackend();
		},
		model: App.Models.User,
		backend: 'superman'
	})

	users = new App.Collections.Users(); //loading bootstrap data;

	App.Views.UsersView = Backbone.View.extend({
		collection: users,
		initialize: function(){
			this.render();
			var self = this;
			this.collection.on("reset", function() {
				self.render();
			});
			this.collection.on("add", function(model){
				self.addOne(model);
			});
		},
		render: function(){
			$.each(this.collection.models, function(i,model){
				$('#content').append((new App.Views.UserView({model:model})).el);				
			})
			return this;
		},
		addOne: function(model){
			$('#content').append((new App.Views.UserView({model:model})).el);
		}
	});

	usersView = new App.Views.UsersView(); // binding the collection view	

})