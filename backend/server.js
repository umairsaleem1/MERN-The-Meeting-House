require('dotenv').config();
const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);
const cookieParser = require('cookie-parser');
const dbConnection = require('./utils/dbConnection');
const path = require('path');







const PORT = process.env.PORT || 8000;  




dbConnection();
app.use(express.json());
app.use(cookieParser());  
app.use(express.static(path.join(__dirname, 'uploads')));






// routes
const authRoute = require('./routes/auth');
const roomsRoute = require('./routes/rooms');  


app.use('/auth', authRoute);
app.use(roomsRoute);





httpServer.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})









// socket.io

const onlineUsers = {};
const roomsParticipants = {};

io.on('connection', (socket)=>{

    console.log('user connected')

    // adding newly connected socket to onlineUsers object and sending the updated onlineUsers to each connected socket
    socket.on('new connection', (userId)=>{  
        if(!(Object.values(onlineUsers).includes(userId))){ 
            onlineUsers[socket.id] = userId;
            io.emit('onlineUsers', Object.values(onlineUsers));
        }
    });

    
    // joining socket to the room and adding the newly joined socket to roomsParticipants object and seding the updated roomsParticipants to the socket who has just joined this room
    socket.on('join room', (roomId, userId)=>{  
        socket.join(roomId);
        
        if(roomsParticipants.hasOwnProperty(roomId)){  
            if(Object.values(roomsParticipants[roomId]).includes(userId)){
                let roomParticipantsIds = Object.values(roomsParticipants[roomId]);
                let indexOfUser = roomParticipantsIds.indexOf(userId);
                let property = Object.keys(roomsParticipants[roomId])[indexOfUser];
                delete roomsParticipants[roomId][property];              
            }
            roomsParticipants[roomId] = { ...roomsParticipants[roomId], [socket.id] : userId };
        }
        else{  
            roomsParticipants[roomId] = { [socket.id] : userId }; 
        } 
        

        io.to(socket.id).emit('roomsParticipants', roomsParticipants);
    })


    // leaving the room and sending the updated roomsParticipants to remaining participants present in the room
    socket.on('leave room', (roomId)=>{
        socket.leave(roomId);

        const roomParticipants = roomsParticipants[roomId];
        delete roomParticipants[socket.id];

        if(Object.entries(roomParticipants).length===0){  
            delete roomsParticipants[roomId];
        }else{
            roomsParticipants[roomId] = roomParticipants;      
        }
        
        socket.to(roomId).emit('updatedRoomsParticipants', roomsParticipants);

    });


    socket.on('disconnect', ()=>{
        delete onlineUsers[socket.id];
        io.emit('onlineUsers', Object.values(onlineUsers));
    });
})
