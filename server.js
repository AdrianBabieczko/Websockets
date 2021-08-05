const express = require('express');
const path = require('path');
const socket = require('socket.io');


const app = express();

const port = process.env.PORT || 8000;

const server = app.listen(port);

const io = socket(server);

io.on('connection', (socket) => {
    console.log('New client! Its id – ' + socket.id);

    socket.on('message', (message) => {
        // console.log('Oh, I\'ve got something from ' + socket.id);
        messages.push(message);
        socket.broadcast.emit('message', message);
    });

    socket.on('disconnect', () => { console.log('Oh, socket ' + socket.id + ' has left') });

    // console.log('I\'ve added a listener on message and disconnect events \n');
});

app.use(express.static('client'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});



const messages = [];