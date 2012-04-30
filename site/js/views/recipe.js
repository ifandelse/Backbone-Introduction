define( [
	'backbone',
	'underscore',
	'jquery',
    'text!views/templates/recipe.html',
    'text!views/templates/items-template.html',
    'text!views/templates/steps-template.html'
], function ( Backbone, _, $, template, itemsTemplate, stepsTemplate ) {
	return Backbone.View.extend( {
		el: "#content",

		events: {
			"click #addCancel" : "onCancel",
			"click #addNew" : "onAddNew",
			"click #btnAddItem" : "onAddItem",
			"click #btnAddStep" : "onAddStep",
			"click .item-remove" : "onRemoveItem",
			"change .text-updateable" : "updateValueFromDom",
			"click #editRecipe" : "editRecipe",
			"click #updateRecipe" : "updateRecipe",
			"click #viewRecipe" : "viewRecipe"
		},

		initialize: function(options) {
			_.bindAll(this);
			this.options = options;
			this.template = _.template(template);
			this.itemsTemplate = _.template(itemsTemplate);
			this.stepsTemplate = _.template(stepsTemplate);
		},

		setUpModel: function() {
			if(!this.bound) {
				this.model.bind("change:items", this.renderItems);
				this.model.bind("change:steps", this.renderSteps);
				this.bound = true;
			}
		},

		render: function() {
			this.setUpModel();
			var model = _.extend({}, this.model.toJSON(), { context: this.options.context });
			this.$el.html(this.template(model));
			this.renderItems();
			this.renderSteps();
		},

		renderItems: function() {
			this.renderList("items");
		},

		renderSteps: function() {
			this.renderList("steps");
		},

		renderList: function(list) {
			var items = this[list + "Template"]({ items: this.model.get(list) });
			this.$("#" + list ).replaceWith(items);
		},

		onCancel: function() {
			history.back();
		},

		onAddNew: function() {
			var self = this;
			self.options.app.models.recipeList.add(self.model.toJSON(), { silent: true });
			self.options.app.models.recipeList.last().save( { wait: true }, {
				success: function() {
					self.options.app.router.navigate("", { trigger: true });
					self.model.clear({ silent: true });
				}
			});
		},

		onAddItem: function() {
			this.onAdd("items");
		},

		onAddStep: function() {
			this.onAdd("steps");
		},

		onAdd: function(list) {
			var elem = this.$el.find("#" + list + "_add" ),
				val = elem.val();
			elem.val("");
			this.model.set(list, this.model.get(list).concat(val));
		},

		onRemoveItem: function(e) {
			e.preventDefault();
			var elem = $( e.currentTarget ),
				list = elem.attr("data-list" ),
				idx = elem.attr("data-val" ),
				mdl = _.clone(this.model.get(list));
			mdl.splice(idx,1);
			this.model.set(list, mdl);
		},

		updateValueFromDom: function(e) {
			var elem = $( e.currentTarget);
			this.model.set(elem.attr("id"), elem.val());
		},

		setContext: function(context) {
			this.options.context = context;
			this.render();
		},

		editRecipe : function() {
			this.model.getMemento();
			this.setContext("edit");
		},

		updateRecipe: function() {
			var self = this;
			self.model.save( { wait: true }, {
				success: function() {
					self.options.app.router.navigate("", { trigger: true });
				}
			});
		},

		viewRecipe: function() {
			this.model.applyMemento();
			this.setContext("view");
		}
	} );
} );