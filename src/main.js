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

  $(document).click('click', function(e){
    var $cell = $(e.target);
    var pos = $cell.data('cell-id');
    if(pos){
      socket.send(pos);
    }
  });
});

function render(data) {
  $('#game').html(template(data));
}
