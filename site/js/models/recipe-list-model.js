define( [
	'backbone',
	'jquery',
    'models/recipe-model'
], function ( Backbone, $, RecipeModel ) {
	return Backbone.Collection.extend( {
		url: "/api/recipe",

		model: RecipeModel,

		initialize: function() {

		}
	} );
} );