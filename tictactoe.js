var http = require('http');
var express = require('express');
var engine = require('engine.io');
var redis = require('redis');

var app = express();
var http_server = http.createServer(app);
var ws_server = engine.attach(http_server);
var client = redis.createClient();

var cells = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];

app.use(express.static(__dirname + '/public'));

ws_server.on('connection', function(client) {

  client.on('message', setCell);

  getGameState(function(data) {
    client.send(JSON.stringify(data));
  });

  var subscriber = redis.createClient();
  subscriber.subscribe('change');
  subscriber.on('message', function() {
    getGameState(function(data) {
      client.send(JSON.stringify(data));
    });
  });


});


function initGame() {
  var multi = client.multi();
  cells.forEach(function(value) {
    multi.del(value);
  });
  multi.set('next', 'x');
  multi.exec();
}

function setCell(id) {
  client.get('next', function(err, value) {
    client.get(id, function(err, current_cell_value){
      if(!current_cell_value){
        var next = value === 'x' ? 'o' : 'x';

        var multi = client.multi();
        multi.set(id, value);
        multi.set('next', next);
        multi.publish('change', id);
        multi.exec();
      }
    });
  });
}

function getGameState(callback) {
  var data = {};
  data.pid = process.pid;
  var multi = client.multi();
  cells.forEach(function(value) {
    multi.get(value);
  });
  multi.get('next');
  multi.exec(function(err, results) {
    cells.forEach(function(value, index) {
      data[value] = results[index];
    });
    data.next = results[cells.length];
    callback(data);
  });
}


initGame();

http_server.listen(5555);
