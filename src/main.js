var engine = require('engine.io-client');
var $ = require('jquery');
var template = require('./template.hbs');

$(document).ready(function() {
  var socket = engine('/', {
    transports: ['websocket']
  });
  socket.on('message', function(json) {
    render(JSON.parse(json));
  });
});

function render(data) {
  $('#game').html(template(data));
}
