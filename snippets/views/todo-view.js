var snippets = {

    // 1. Remove old edit events
    events: {
        'click .toggle': 'toggleCompleted',
        'dblclick label': 'edit',
        'click .destroy': 'clear',
        // 'keypress .edit': 'updateOnEnter',
        // 'keydown .edit': 'revertOnEscape',
        // 'blur .edit': 'close'
    },

    // 2. Remove reference to input
    render: function() {
        // this.$input = this.$('.edit');
    },

    // 3. Remove close(), updateOnEnter() and revertOnEscape()
    // close: function () { ... }
    // updateOnEnter: function (e) { ... }
    // revertOnEscape: function (e) { ... }

    // 4. Replace edit()
    edit: function () {
        this.$el.addClass('editing');
        if (this.editView) {
            this.editView.activate();
        }
        else {
            this.editView = new app.TodoEditView({ model: this.model }).render();
            this.$el.append(this.editView.$el);
            this.listenTo(this.editView, 'deactivate', function() {
                this.$el.removeClass('editing');
            });
        }
    },

    // 5. Add safety for subview
    render: function() {
        if (this.editView) {
            this.$el.append(this.editView.$el);
        }
    },

    // 6. Remove unnecessary safety
    render: function() {
        // if (this.model.changed.id !== undefined) {
        //     return;
        // }
    },

    // 7. Listen to new event
    initialize: function() {
        this.listenTo(this.model, 'checkVisible', this.toggleVisible);
    },

    // 8. isHidden moved to model
    toggleVisible: function () {
        this.$el.toggleClass('hidden', this.model.isHidden());
    },
    // isHidden: function () { ... },

};