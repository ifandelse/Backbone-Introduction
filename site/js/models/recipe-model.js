define( [
	'backbone',
	'jquery'
], function ( Backbone, $ ) {
	return Backbone.Model.extend( {

		urlRoot: "/api/recipe",

		defaults: {
			id: null, // For Backbone to consider this a new model, use undefined or null
			title: "",
			description: "",
			items: [],
			steps: []
		},

		getMemento: function() {
			this.memento = this.toJSON();
		},

		applyMemento: function() {
			if(this.memento) {
				this.set(this.memento);
			}
		}
	} );
} );