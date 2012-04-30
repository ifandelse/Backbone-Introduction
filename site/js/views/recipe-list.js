define( [
	'backbone',
	'underscore',
	'jquery',
	'models/recipe-list-model',
    'text!views/templates/recipe-list.html'
], function ( Backbone, _, $, RecipeListCollection, template ) {
	return Backbone.View.extend( {
		el: "#content",

		events: {
			"click .remove-recipe" : "removeRecipe"
		},

		initialize: function(options) {
			_.bindAll(this);
			this.options = options;
			this.template = _.template(template);
			this.options.app.models.recipeList = this.collection = new RecipeListCollection();
			this.collection.bind("add", this.render);
			this.collection.bind("reset", this.render);
			this.collection.bind("remove", this.render);
			this.collection.fetch();
		},

		render: function() {
			this.$el.html(this.template({ recipes: this.collection.toJSON() }));
		},

		removeRecipe: function (e) {
			e.preventDefault();
			var elem = $( e.currentTarget );
			this.collection.remove(this.collection.get(elem.attr("data-val")));
		}
	} );
} );