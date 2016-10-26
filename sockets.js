var socketio = io.connect('http://localhost:8080');

var usersAtPage = [];

socketio.on('users', function(users){
	usersAtPage = users;
});