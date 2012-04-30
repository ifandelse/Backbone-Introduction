define( [
	'backbone',
	'jquery',
    'views/container',
    'views/recipe-list',
    'views/recipe',
    'models/recipe-model'
], function ( Backbone, $, ContainerView, RecipeListView, RecipeView, RecipeModel ) {
	return Backbone.Router.extend( {
		routes: {
			"" : "root",
			"recipe/new" : "newRecipe",
			"recipe/:recipeId/:context" : "recipe",
			"recipe/:recipeId" : "recipe"
		},

		initialize: function(options) {
			var self = this;
			self.options = options;
			$(document).delegate("a.ps-nav", "click", function(e){
				e.preventDefault();
				self.navigate($(this).attr('href'), { trigger: true });
			});
			if(! self.options.app.views.container ) {
				self.options.app.views.container = new ContainerView({ app: self.options.app });
			}
			self.options.app.views.container.render();
		},

		root: function() {
			if( !this.options.app.views.recipeList ) {
				this.options.app.views.recipeList = new RecipeListView({ app: this.options.app });
			}
			this.options.app.views.recipeList.render();
		},

		newRecipe: function() {
			if( !this.options.app.views.currentRecipe ) {
				this.options.app.views.currentRecipe = new RecipeView({ app: this.options.app });
			}
			this.options.app.views.currentRecipe.options.context = "new";
			this.options.app.views.currentRecipe.model = new RecipeModel();
			this.options.app.views.currentRecipe.render();
		},

		recipe: function(id, context) {
			var self = this;
			if( !self.options.app.views.currentRecipe ) {
				self.options.app.views.currentRecipe = new RecipeView({ app: self.options.app });
			}
			self.options.app.views.currentRecipe.options.context = context || "view";
			self.options.app.views.currentRecipe.model = this.options.app.models.recipeList.get(id);
			this.options.app.views.currentRecipe.render();
		}
	} );
} );