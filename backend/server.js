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





    // joining socket to the room and adding the newly joined socket to roomsParticipants object's respective room and seding the updated currently joined roomParticipants to the socket who has just joined this room
    socket.on('join room', (roomId, userId, userAvatar, userName)=>{  
        
        socket.join(roomId);
        
        const newParticipant = {
            socketId : socket.id, 
            name: userName,
            avatar: userAvatar,  
            messages: []
        }
    

        if(roomsParticipants.hasOwnProperty(roomId)){   
            roomsParticipants[roomId][userId] = newParticipant;  
        }
        else{  
            roomsParticipants[roomId] = { [userId] : newParticipant}     
        } 
        

        io.to(socket.id).emit('roomParticipants', roomsParticipants[roomId]); 
        socket.to(roomId).emit('updatedRoomParticipants', roomsParticipants[roomId]);

    })




    // leaving the room and sending the updated roomParticipants to remaining participants present in the room
    socket.on('leave room', (roomId, userId)=>{

        socket.leave(roomId);  

        const roomParticipants = roomsParticipants[roomId];
        delete roomParticipants[userId];   

        
        socket.to(roomId).emit('participant left', userId, roomParticipants);

    });



    socket.on('end room', (roomId, userId)=>{
        
        socket.leave(roomId);    

        const roomParticipants = roomsParticipants[roomId];
        delete roomParticipants[userId];
        
        socket.to(roomId).emit('room ended'); 

    })


    socket.on('disconnect', ()=>{
        delete onlineUsers[socket.id];
        io.emit('onlineUsers', Object.values(onlineUsers));
    });
})
