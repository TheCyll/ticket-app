const { io } = require('../server');
const { TicketController } = require('../classes/ticket-controller');

const ticketController = new TicketController;

io.on('connection', (client) => {

    client.on('nextTicket', (data, callback) => {
        
        let nextTicket = ticketController.next();

        console.log(nextTicket);
        callback(nextTicket);

    });

    client.emit('currentState', {
        current: ticketController.getLastTicket(),
        last4: ticketController.getLast4Tickets()
    });

    

    client.on('attendTicket', (data, callback) => {

        if( !data.desk ){
            return callback({
                err:true,
                message: 'El escritorio es necesario'
            });
        }

        
        let attendTicket = ticketController.attendTicket( data.desk );
        
        callback( attendTicket );
        // Update/notify changes in the public screen
        client.broadcast.emit('last4', {
            last4: ticketController.getLast4Tickets()
        });
    });

});

