var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8000, function(){
	console.log('Listening on Port 8000...');
});