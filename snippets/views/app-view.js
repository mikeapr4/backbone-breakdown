var snippets = {

    initialize: function() {

        // 1. Prompt for username and fetch user-specific todos
        if (!app.user) {
            bootbox.prompt('Please provide your username:', function (user) {
                app.user = (user || '').toLowerCase().trim();

                // Suppresses 'add' events with {reset: true} and prevents the app view
                // from being re-rendered for every model. Only renders when the 'reset'
                // event is triggered at the end of the fetch.
                app.todos.fetchUserTodos({reset: true});
            });
        }
    },

    // 2. New model attribute (user)
    newAttributes: function () {
        return {
            title: this.$input.val().trim(),
            order: app.todos.nextOrder(),
            completed: false,
            user: app.user,
        };
    },

    // 3. Wait on create
    createOnEnter: function() {
        app.todos.create(this.newAttributes(), { wait: true });
    },

    // 4. Remove filtering triggers
    initialize: function() {
        // this.listenTo(app.todos, 'change:completed', this.filterOne);
        // this.listenTo(app.todos, 'filter', this.filterAll);
    },
    // filterOne: function (todo) { ... },
    // filterAll: function () { ... },

};