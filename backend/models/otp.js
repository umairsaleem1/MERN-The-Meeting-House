const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    method: {
        type: String,
        required: true,
        trim: true
    },
    receiver: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    otp: {
        type: Number,
        required: true
    }
}, { timestamps: true });

otpSchema.index({'updatedAt': 1}, {expireAfterSeconds: 7200});


const Otp = mongoose.model('otp', otpSchema);

module.exports = Otp;