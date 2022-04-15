const mongoose = require('mongoose');
const { baseURL } = require('../utils/baseURL');

const userSchema = new mongoose.Schema({
    phone: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        get: (avatar) => {
            if (avatar) {
                return `${baseURL}${avatar}`;
            }
            return avatar;
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});


const User = mongoose.model('user', userSchema);

module.exports = User;