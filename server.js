var express = require('express');
var path = require('path');

var app = express();
var server = require('http').createServer(app);
app.use('/', express.static(path.join(__dirname, '/UI')));
var io = require('socket.io')(server);
io.on('connection', function(client) {
    client.on('event', function(data) {});
    client.on('disconnect', function() {});
    client.on('room', function(data) {

        client.join(data.roomId);
        console.log('someone joined room ' + data.roomId + ' ' + client.id);

    });

    client.on('toBackEnd', function(data) {
        console.log("aagyaaaaa", data)
        client.in('temp').emit('message', data);

    })

});

var port = process.env.PORT || 3000;

server.listen(port);