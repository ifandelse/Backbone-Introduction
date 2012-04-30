define([
	'backbone',
	'infrastructure/router',
    'views/container'
], function(Backbone, Router) {
	var app = {
		router: undefined,
		models: {},
		views: {},
		init: function() {
			this.router = new Router( { app: this });
			Backbone.history.start( {
				pushState : true
			} );
		}
	};

	_.bind(app.init, app);

	return app;
});