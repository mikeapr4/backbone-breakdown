var fs = require('fs');
var ncp = require('ncp').ncp;
var app = require('./app');
var port = process.env.PORT || 3000;

function start() {
	var server = app.listen(port, function() {
	  console.log('Express server listening on port ' + port);
	});
}

// If Todomvc needs to be copied into 'client'
if (!fs.existsSync('client/readme.md')) {
	ncp('node_modules/todomvc/examples/backbone', 'client', function(err) {
		if (err) {
			console.error(err);
		}
		else {
			start();
		}
	});
}
else {
	start();
}