const net = require('net');
const fs = require('fs');

//const port = process.env.PORT || 5000;

const sockets = [];


var clientId = 0;



const chatLogFile = __dirname + '/chatlog.txt';

//ene dooroos bagshiin hiisen yum
    let server = net.createServer((socket) => {
        clientId++;

    socket.name = "Client" + clientId;


    var clientName = socket.name;

        let welcomeMsg = `Welcome to the chat group Client${clientId}\n`;


        socket.setEncoding('utf8');

        sockets.push(socket);
        console.log(clientName + ' is joining this chat.');

        socket.write(welcomeMsg);

        //write(`Client${socket.clientId} has connected`);


        socket.on('data', function(data) {
            console.log(`got msg: ${data}  -${sockets.length}-`);

            for (var i = 0; i < sockets.length; i++) {
                if (sockets[i] === socket) continue;
                sockets[i].write(`Client ${i} says ${data}`);
            }
        });



// When client leaves
    socket.on('end', function() {

    var message = clientName + ' disconnected\n';

    // Log it to the server output
    process.stdout.write(message);

    // Remove client from socket array
    //removeSocket(socket);

    // Notify all clients
    //broadcast(clientName, message);
    });



// Remove disconnected client from sockets array
function removeSocket(socket) {

    sockets.splice(sockets.indexOf(socket), 1);

};






    fs.appendFile(chatLogFile, welcomeMsg, (err) => {
        if(err) {
            return console.log(err);
        }
        console.log("Chat log file was saved!")
    });


});






    server.listen(5000);
    console.log('listening on port 5000');