var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Datastore = require('nedb');
var todoData = new Datastore({ filename: './todo.data', autoload: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('client'));

// Expose our node_modules
var nodeMods = express.Router();
nodeMods.use(express.static('node_modules'));
app.use('/node_modules', nodeMods);

var todoRouter = express.Router();
// Create
todoRouter.post('/', function (req, res) {
	todoData.insert(req.body, function(err, todo) {
		res.status(201).send(todo);
	});
});
// Read
todoRouter.get('/', function (req, res) {
    var filter = req.query.user && req.query.user.length ? req.query : { user: { $exists: false } };
    todoData.find(filter, function (err, todos) {
        res.status(200).send(todos);
    });
});
// Update
todoRouter.put('/:id', function (req, res) {
    todoData.update({ _id: req.params.id }, req.body, {}, function (err, noModified) {
        res.status(200).send(req.body);
    });
});
// Delete
todoRouter.delete('/:id', function (req, res) {
    todoData.remove({ _id: req.params.id }, function (err, noRemoved) {
        res.sendStatus(204);
    });
});
// Read User stats
todoRouter.get('/stats', function (req, res) {
    todoData.find({}, function (err, todos) {
        var stats = todos.reduce(function(stats, todo) {
            var user = todo.user || 'default';
            stats[user] = (stats[user] || 0) + 1;
            return stats;
        }, {});
        res.status(200).send(stats);
    });
});

app.use('/api/todos', todoRouter);

module.exports = app;