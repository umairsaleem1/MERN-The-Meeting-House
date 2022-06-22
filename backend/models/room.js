const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['public', 'private']
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }]
}, { timestamps: true });

const Room = mongoose.model('room', roomSchema);

module.exports = Room;