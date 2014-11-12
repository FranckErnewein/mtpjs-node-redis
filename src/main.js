var engine = require('engine.io-client');

var socket = engine('/', {
  transports: ['websocket']
});

socket.on('open', function(){
  console.log('open');
});
