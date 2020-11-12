var socket = io();

var searchParams = new URLSearchParams( window.location.search );


if(!searchParams.has('desk')){
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var desk = searchParams.get('desk');
var label = $('small');

console.log(desk);
$('h1').text('Escritorio '+ desk);



$('button').on('click', function(){

    socket.emit('attendTicket', { desk: desk }, function( resp ){
        console.log(resp);

        if(resp === 'No hay tickets'){
            label.text(resp);
            alert(resp);
            return;
        }
        
        label.text('Ticket ' + resp.num );
    });
    
});
 

