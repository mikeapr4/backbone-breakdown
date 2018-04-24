/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
	'use strict';

	// Todo Item Edit View
	// --------------

	app.TodoEditView = Backbone.View.extend({

		template: _.template($('#item-edit-template').html()),

		events: {
			'click .save': 'save',
			'click .cancel': 'cancel',
		},

		initialize: function () {
			this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.model, 'invalid', this.warn);
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			this.$input = this.$('.title');
			this.$date = this.$('.duedate');
			return this;
		},

		activate: function() {
			this.$el.show();
			this.$input.focus();
		},

		// Close the `"editing"` mode, saving changes to the todo.
		save: function () {
			var valid = this.model.save({
				title: this.$input.val().trim(),
				duedate: this.$date.val()
			});
			if (valid) {
				this.deactivate();
			};
		},

		warn: function(model, error) {
			bootbox.alert(error);
		},

		// Close the `"editing"` mode, resetting the display to the model values
		cancel: function () {
			this.deactivate();
			this.$input.val(this.model.get('title'));
			this.$date.val(this.model.get('duedate'));
		},

		deactivate: function() {
            this.$el.hide();
            this.trigger('deactivate');
		},

	});
})(jQuery);
