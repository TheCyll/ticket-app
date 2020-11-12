// Comand to connect with server (sockets)
var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function(){
    console.log('Desconectado del servidor');

});

socket.on('currentState', function( resp ){

    console.log(resp);
    label.text( resp.current );

});

$('button').on('click', function(){

    socket.emit('nextTicket', null, function(nextTicket){

        label.text(nextTicket);
    });
});