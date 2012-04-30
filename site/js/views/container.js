define( [
	'backbone',
	'underscore',
	'jquery',
    'text!views/templates/container.html'
], function ( Backbone, _, $, template ) {
	return Backbone.View.extend( {
		el: "body",

		initialize: function() {
			this.template = template;
		},

		render: function() {
			this.$el.html(this.template);
		}
	} );
} );