const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    client.on('siguienteTicket', (data, callback) => {
        let ticket = ticketControl.siguiente();
        callback(ticket);
    });
    /* 
        emitir un evento 'estado actual'
        {
            actual: ticketControl.getUltimoTicket()
        }
    */
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4Ticket()
    });
    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                ok: false,
                err: {
                    message: 'El escritorio es necesario'
                }
            });
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        client.broadcast.emit('ultimos4', ticketControl.getUltimos4Ticket());
        callback(atenderTicket);
        // Actualiza / notificar cambios en los ultimos 4
    });
    return ticketControl.getUltimoTicket();
});