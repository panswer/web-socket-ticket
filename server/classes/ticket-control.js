const fs = require('fs');
class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}
class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.data = require('../data/data.json');
        this.tickets = [];
        this.ultimos4 = [];
        if (this.data.hoy === this.hoy) {
            this.ultimo = this.data.ultimo;
            this.tickets = this.data.tickets;
            this.ultimos4 = this.data.ultimos4 ? this.data.ultimos4 : [];
        } else {
            this.reiniciarConteo();
        }
    }
    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;
    }
    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }
    getUltimos4Ticket() {
        return this.ultimos4;
    }
    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return {
                ok: false,
                err: {
                    message: 'No hay tickets en cola'
                }
            }
        }
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();
        let atenderTicket = new Ticket(numeroTicket, escritorio);
        this.ultimos4.unshift(atenderTicket);
        if (this.ultimos4.length > 4) {
            // Borra el ultimo
            this.ultimos4.splice(-1, 1);
        }
        console.log('Ultimos 4');
        console.log(this.ultimos4);
        this.grabarArchivo();
        return atenderTicket;
    }
    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        console.log('Se ha iniciado el sistema');
        this.grabarArchivo();
    }
    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl
}