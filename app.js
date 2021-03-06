var fs = require('fs')
, http = require('http')
, socketio = require('socket.io');

var server = http.createServer(function (req, res) {
  console.log("Request for: " + req.url);

  var filePath = '.' + req.url;
  if (filePath == './') filePath = './drawer.html';

  fs.exists(filePath, function(exists) {
    if (exists) {
      fs.readFile(filePath, function(error, content) {
        if (error) {
          res.writeHead(500);
          res.end();
        } else {
          res.writeHead(200);
          res.end(content, 'utf-8');
        }
      });
    } else {
      res.writeHead(404);
      res.end();
    }
  });

  // res.writeHead(200, {'Content-Type': 'text/html'});
  // res.end(fs.readFileSync(__dirname + '/drawer.html'));
}).listen(3000, function(){
  console.log("Server running at 3000");
});


var io = socketio.listen(server);
var clients = 0;

io.sockets.on('connection', function(socket) {
  io.sockets.emit('new-connection', {userCount: ++clients});
});

io.on('connection', function(socket) {
  console.log("Connection via socketio");

  socket.on('disconnect', function() {
    socket.broadcast.emit('user-disconnect', {userCount: --clients});
  });

  socket.on('paint', function(data){
    console.log("Coordinates rec. at: " + data.x + " - " + data.y);

    socket.broadcast.emit('update-canvas', data);
  });

});
