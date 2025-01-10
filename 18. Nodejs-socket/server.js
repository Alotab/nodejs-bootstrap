const express = require('express');
const http = require('http');
const socketIo = require('socket.io');


const app = express();

const server = http.createServer(app);

// initiate socket.io and attach this to the http server
const io =  socketIo(server);

app.use(express.static('public'));

const users = new Set();

io.on('connection',(socket)=>{
    console.log('A user is now connected');

    //handle users when they join the chat
    socket.on('join', (userName)=>{
        users.add(userName);

        socket.userName = userName;

        //broadcast to all clients/users that a new user has joined
        io.emit('userJoined', userName);

        //send the updated user list to all clients
        io.emit('userList', Array.from(users))
    });

    //handle incomig message
    socket.on('chatMessage', (message)=> {
        // broadcast the received message to all connected group members
        io.emit('chatMessage', message)

    });

    // handle user diconnection
    socket.on('disconnect', ()=> {
        console.log('A user is diconnected', socket.userName);

        users.forEach(user=> {
            if(user === socket.userName){
                users.delete(user);

                io.emit('userLeft', user);

                //update the user list
                io.emit('userList', Array.from(users));
            }
        });
    });
});

const port = 3000
server.listen(port, ()=>{
    console.log('Server is now running')
})