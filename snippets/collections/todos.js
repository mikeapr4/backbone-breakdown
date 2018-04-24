var snippets = {

    // 1. Change localStorage to REST API
    //localStorage: new Backbone.LocalStorage('todos-backbone'),
    url: '/api/todos',


    // 2. Add special fetch
    fetchUserTodos: function (opts) {
        return this.fetch(_.extend({data: {user: app.user}}, opts));
    },

    // 3. Add check visible
    checkVisible: function() {
        this.invoke('trigger', 'checkVisible');
    },

};

