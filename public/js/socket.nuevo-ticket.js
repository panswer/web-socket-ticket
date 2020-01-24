// Comando para establecer la coneccion
var socket = io();

var label = $('#lblNuevoTicket')

socket.on('connect', function() {
    console.log('Conectado al servidor');
});
socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});
// on 'estadoActual'
socket.on('estadoActual', function(resp) {
    console.log(resp);
    label.text(resp.actual);
});
$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        console.log(siguienteTicket);
        label.text(siguienteTicket);
    });
});