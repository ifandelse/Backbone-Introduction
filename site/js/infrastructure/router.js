/*
	This module contains perhaps one of the worst dangers in the sample app: View Management
	being handled by the Router.  I typically see this happen in the router, or spread out
	across various views themselves.  View lifecycle management is a serious concern in any
	client side architecture, and it's very difficult to provide something that isn't *so*
	opinionated that it proves to not be flexible enough for many situations, but placing
	this logic in the router is a solution that will **not** scale much at all beyond a small
	handful of views.  Of all the dangers, I see this repeated the most in Backbone applications
	that I've run across.
 */
define( [
	'backbone',
	'jquery',
    'views/container',
    'views/recipe-list',
    'views/recipe',
    'views/about',
    'models/recipe-model'
], function ( Backbone, $, ContainerView, RecipeListView, RecipeView, AboutView, RecipeModel ) {
	return Backbone.Router.extend( {
		routes: {
			"" : "root",
			"recipe/new" : "newRecipe",
			"recipe/:recipeId/:context" : "recipe",
			"recipe/:recipeId" : "recipe",
			"about" : "about"
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
			this.options.app.views.currentRecipe.bound = false;
			this.options.app.views.currentRecipe.render();
		},

		recipe: function(id, context) {
			var self = this;
			if( !self.options.app.views.currentRecipe ) {
				self.options.app.views.currentRecipe = new RecipeView({ app: self.options.app });
			}
			self.options.app.views.currentRecipe.options.context = context || "view";
			self.options.app.views.currentRecipe.model = this.options.app.models.recipeList.get(id);
			this.options.app.views.currentRecipe.bound = false;
			this.options.app.views.currentRecipe.render();
		},

		about: function() {
			if( !this.options.app.views.about ) {
				this.options.app.views.about = new AboutView();
			}
			this.options.app.views.about.render();
		}
	} );
} );