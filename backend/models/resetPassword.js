const mongoose = require('mongoose');

const resetPasswordSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true });

resetPasswordSchema.index({'updatedAt': 1}, {expireAfterSeconds: 7200});



const ResetPassword = mongoose.model('resetPassword', resetPasswordSchema);

module.exports = ResetPassword;