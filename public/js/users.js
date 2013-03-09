$(function(){
	Backbone.io.connect();

	//Models ------- GLOBAL
	User = Backbone.Model.extend({
		urlRoot:'/users',
		h3change: function(){
			this.set({name:'I have became Superman'});
			this.save();
		}
	})

	//Views ------- GLOBAL
	UserView = Backbone.View.extend({
		className: 'thumbnail',
		events:{
			"click h3":"h3change"
		},
		h3change: function(e){
			this.model.h3change();
		},
		template: _.template("<img src='' height='100' width='100'><h3><%= name %></h3><p><%= occupation %></p>"),
		initialize:function(){
			this.listenTo(this.model, 'change', this.render);
			this.render();
		},
		render:function(){
			this.$el.html(this.template(this.model.attributes));
			return this;
		}
	})

	//Collection -------- GLOBAL
	Users = Backbone.Collection.extend({
		initialize: function(){
			this.bindBackend();
		},
		model: User,
		url: '/users',
		backend: 'superman'
	})

	users = new Users(); //loading bootstrap data;
	UsersView = Backbone.View.extend({
		collection: users,
		initialize: function(){
			this.render();
			var self = this;
			this.collection.on("reset", function() {
				self.render();
			});
		},
		render: function(){
			$.each(this.collection.models, function(i,model){
				$('#content').append((new UserView({model:model})).el);				
			})
			return this;
		}
	});

	usersView = new UsersView();
})