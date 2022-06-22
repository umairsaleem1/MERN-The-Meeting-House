const router = require('express').Router();
const Room = require('../models/room');
const auth = require('../middlewares/auth');
const refreshToken = require('../middlewares/refreshToken');
const upload = require('../middlewares/upload');
const cloudinary = require('../config/cloudinary');




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
        const rooms = await Room.find({ type: 'public' }).populate('creator', { password: 0 }).sort({ createdAt: -1 });

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





// delete a room
router.delete('/rooms/:roomId', refreshToken, auth, async (req, res)=>{
    try{
        const { roomId } = req.params;
        await Room.findByIdAndDelete({ _id: roomId });

        res.status(200).json({
            message: 'Room deleted successfylly'
        });
        
    }catch(e){
        console.log(e);
        res.status(500).json({
            message: 'Some problem occurred'
        });
    }
});




router.post('/rooms/:roomId/uploadfile', refreshToken, auth, upload.single('file'), async (req, res)=>{
    try{
        const file = req.file;
        if(!file){
            return res.status(400).json({
                message: 'File is not present'
            });
        }

        const result = await cloudinary.uploader.upload(req.file.path, { resource_type: 'auto' });
        
        res.status(200).json({
            file: { file: result.secure_url, name: req.file.originalname, cloudinaryId: result.public_id, type: result.resource_type }
        });

    }catch(e){
        console.log(e);
        res.status(500).json({
            message: 'Some problem occurred'
        });
    }
});





module.exports = router;