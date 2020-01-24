var soket = io();

var searchParams = new URLSearchParams(window.location.search);

var label = $('small');

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
};

var escritorio = searchParams.get('escritorio');

console.log(escritorio);

$('h1').text('Escritorio ' + escritorio);


$('button').on('click', function() {
    soket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        console.log(resp);
        if (!resp.ok && resp.ok != undefined) {
            let message = resp.err.message;
            label.text(message)
            alert(resp.err.message);
        } else {
            label.text('Ticket' + resp.numero);
        }
    });
});