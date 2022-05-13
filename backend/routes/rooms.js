const router = require('express').Router();
const Room = require('../models/room');
const auth = require('../middlewares/auth');
const refreshToken = require('../middlewares/refreshToken');




// create a room
router.post('/rooms', refreshToken, auth, async (req, res)=>{
    try{
        const { topic, selectedRoomType } = req.body;
        if(!topic || !selectedRoomType){
            return res.status(400).json({
                message: 'Please fill out the required fields'
            });
        }

        const newRoom = new Room({
            topic,
            type: selectedRoomType,
            creator: req.id,
            participants: [req.id]
        });

        const createdRoom = await newRoom.save();
        await createdRoom.populate('creator', { password: 0 });

        res.status(201).json({
            createdRoom
        });

    }catch(e){
        console.log(e);
        res.status(500).json({
            message: 'Some problem occurred'
        });
    }
});




// get all public rooms
router.get('/rooms', refreshToken, auth, async (req, res)=>{
    try{
        const rooms = await Room.find({ type: 'public' }).populate('creator', { password: 0 });

        res.status(200).json({
            rooms: rooms
        });

    }catch(e){
        res.status(500).json({
            message: 'Some problem occurred'
        });
        console.log(e);
    }
});





// get a particular room
router.get('/rooms/:roomId', async (req, res)=>{
    try{
        const { roomId } = req.params;
        if(!roomId){
            return res.status(400).json({
                message: 'Invalid request'
            });
        }

        const room = await Room.findById({ _id: roomId });
        if(!room){
            return res.status(404).json({
                message: 'Room not found with the provided id'
            });
        }

        res.status(200).json({
            room: room
        });
         
    }catch(e){
        res.status(500).json({
            message: 'Some problem occurred'
        });
        console.log(e);
    }
})

module.exports = router;