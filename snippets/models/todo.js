var snippets = {

    // 1. Add ID attribute
    idAttribute: '_id', //BB

    // 2. Add default duedate
    defaults: {
        title: '',
        completed: false,
        duedate: new Date().toISOString().slice(0, 10)
    },

    // 3. isHidden considered a model responsibility - moved here
    isHidden: function () {
        return this.get('completed') ?
            app.TodoFilter === 'active' :
            app.TodoFilter === 'completed';
    },

    // 4. Validation
    validate: function(attrs) {
        if (!attrs.title.length) {
            return 'Title is required';
        }
    },
};