const net = require('net');

let socket = net.createConnection({port:5000}, () =>{
    console.log('connected');
});

socket.setEncoding('utf8');

process.stdin.pipe(socket);


//deerh n take output of stdin and will send as output to client.
// pipe translates something to another

//ene n doorhtoi adil uildel
//process.stdin.on('data', data => {
// client.emit)


socket.on('data', data =>{
    console.log(data);


});




