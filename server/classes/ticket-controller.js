const fs = require('fs');

class Ticket {

    constructor(num, desk){
        this.num = num;
        this.desk = desk;
    }
}

class TicketController{

    constructor(){

        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.last4Tickets = []; 

        let data = require('../data/data.json');

        console.log(data);

        if( data.today === this.today ){
            this.last = data.last;
            this.tickets = data.tickets;
            this.last4Tickets = data.last4Tickets;
        }else{
            this.resetCount();
        }
    }

    next() {

        this.last += 1;      

        let ticket = new Ticket(this.last, null);
        this.tickets.push( ticket );

        this.recordFile();

        return `Ticket ${ this.last }`;
    }

    getLastTicket(){
        return `Ticket ${ this.last }`;
    }

    getLast4Tickets(){
        return this.last4Tickets;
    }

    attendTicket( desk ){
        
        if( this.tickets.length === 0 ){
            return 'No hay tickets';
        }

        let numTicket = this.tickets[0].num;
        this.tickets.shift();

        let attendTicket = new Ticket(numTicket, desk);

        this.last4Tickets.unshift( attendTicket );

        if( this.last4Tickets.length > 4 ){
            this.last4Tickets.splice(-1, 1); //deletes the last
        }

        console.log('Últimos 4');
        console.log(this.last4Tickets);

        this.recordFile();

        return attendTicket;
    }

    resetCount() {

        this.last = 0;
        this.tickets = [];
        this.last4Tickets = [];

        console.log('Se ha inicializado el sistema');    
        this.recordFile();
    }
    
    recordFile(){
        let jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last4Tickets: this.last4Tickets
        };
    
        let jsonDataString = JSON.stringify(jsonData);
    
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketController
}