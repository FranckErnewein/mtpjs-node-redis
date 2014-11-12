var http = require('http');
var express = require('express');
var engine = require('engine.io');

var app = express();
var http_server = http.createServer(app);
var ws_server = engine.attach(http_server);

app.use(express.static(__dirname + '/public'));

ws_server.on('connection', function(){
  console.log('user connected');
});

http_server.listen(5555);
